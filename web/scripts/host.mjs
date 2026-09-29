/**
 * Production server for the designer-facing site.
 *
 * Starts `next start`, then consumes the site.publish queue. Each message
 * runs scripts/publish-site.mjs. The message is acknowledged only after the
 * new build is swapped in and Next reports Ready. A failed build is retried,
 * then dead-lettered.
 *
 * Run from web/: npm run host
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import amqp from "amqplib";

import {
	assertPublishTopology,
	DLQ,
	enqueueDeadLetter,
	enqueueJob,
	jobFromMessage,
	MAX_ATTEMPTS,
	RABBITMQ_URL,
	RETRY_TTL_MS,
	WORK_QUEUE,
} from "./publish-queue.mjs";

const root = process.cwd();
const live = path.join(root, ".next");
const staging = path.join(root, ".next-staging");
const incoming = path.join(root, ".next-incoming");
const previous = path.join(root, ".next-previous");
const ready = path.join(root, ".intake-publish-ready");
const statusPath = path.join(root, ".intake-publish-status.json");
const publishScript = path.join(root, "scripts", "publish-site.mjs");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const port = process.env.PORT || "3008";

let child = null;
let swapping = false;
let consuming = false;
let reconnectTimer = null;

function writeStatus(status) {
	fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
}

function readStatusError() {
	try {
		const parsed = JSON.parse(fs.readFileSync(statusPath, "utf8"));
		return typeof parsed.error === "string" ? parsed.error : "Site rebuild failed.";
	} catch {
		return "Site rebuild failed.";
	}
}

function spawnNext() {
	const env = { ...process.env, INTAKE_HOST: "1" };
	delete env.BUILD_DIR;
	const next = spawn(process.execPath, [nextBin, "start", "-p", port], {
		cwd: root,
		env,
		stdio: ["ignore", "pipe", "pipe"],
	});
	let readySeen = false;
	/** @type {Array<() => void>} */
	const waiters = [];
	const note = (chunk, stream) => {
		stream.write(chunk);
		if (!readySeen && chunk.toString().includes("Ready")) {
			readySeen = true;
			for (const resolve of waiters) resolve();
			waiters.length = 0;
		}
	};
	next.stdout.on("data", (chunk) => note(chunk, process.stdout));
	next.stderr.on("data", (chunk) => note(chunk, process.stderr));
	next.on("exit", (code, signal) => {
		if (swapping) return;
		console.error(`next start exited (${signal ?? code}). Host is stopping.`);
		process.exit(code ?? 1);
	});
	next.waitUntilReady = (timeoutMs) =>
		new Promise((resolve, reject) => {
			if (readySeen) {
				resolve();
				return;
			}
			const timer = setTimeout(() => {
				reject(new Error("next start did not become ready"));
			}, timeoutMs);
			waiters.push(() => {
				clearTimeout(timer);
				resolve();
			});
		});
	child = next;
	return next;
}

function claimStaging() {
	fs.rmSync(ready, { force: true });
	fs.rmSync(incoming, { recursive: true, force: true });
	fs.renameSync(staging, incoming);
}

function promoteIncoming() {
	fs.rmSync(previous, { recursive: true, force: true });
	if (fs.existsSync(live)) fs.renameSync(live, previous);
	fs.renameSync(incoming, live);
}

function runPublish() {
	return new Promise((resolve) => {
		const build = spawn(process.execPath, [publishScript], {
			cwd: root,
			env: process.env,
			stdio: "inherit",
		});
		build.on("error", () => resolve(1));
		build.on("exit", (code) => resolve(code ?? 1));
	});
}

/**
 * Swap .next-staging into place and wait until the replacement Next process
 * is accepting requests. The caller acknowledges the queue message after this.
 */
function restartAndWait() {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(staging)) {
			reject(new Error("The rebuild finished without a .next-staging directory."));
			return;
		}
		swapping = true;
		try {
			claimStaging();
		} catch (error) {
			swapping = false;
			reject(error);
			return;
		}

		const finish = () => {
			try {
				promoteIncoming();
			} catch (error) {
				swapping = false;
				reject(error);
				return;
			}
			swapping = false;
			const next = spawnNext();
			next.waitUntilReady(30_000).then(resolve, reject);
		};

		const current = child;
		if (!current || current.exitCode !== null || current.signalCode !== null) {
			finish();
			return;
		}
		current.once("exit", finish);
		current.kill("SIGTERM");
		setTimeout(() => {
			if (current.exitCode === null && current.signalCode === null) {
				current.kill("SIGKILL");
			}
		}, 10_000).unref();
	});
}

async function settleFailure(channel, job) {
	const error = readStatusError();
	if (job.attempt < MAX_ATTEMPTS) {
		const nextAttempt = job.attempt + 1;
		writeStatus({
			state: "running",
			startedAt: new Date().toISOString(),
			log: `${error}\nRetry ${nextAttempt} of ${MAX_ATTEMPTS} in ${RETRY_TTL_MS / 1000}s.\n`,
		});
		await enqueueJob(channel, { slug: job.slug, attempt: nextAttempt });
		return;
	}
	await enqueueDeadLetter(channel, job, error);
	writeStatus({
		state: "error",
		finishedAt: new Date().toISOString(),
		error: `${error} Gave up after ${MAX_ATTEMPTS} attempts. The message is on ${DLQ}.`,
		log: error,
	});
}

async function handleJob(channel, message) {
	const job = jobFromMessage(message);
	console.log(
		`site.publish: ${job.slug || "(republish)"} attempt ${job.attempt} of ${MAX_ATTEMPTS}`
	);
	try {
		const code = await runPublish();
		if (code !== 0) {
			await settleFailure(channel, job);
			channel.ack(message);
			return;
		}
		await restartAndWait();
		channel.ack(message);
		console.log("site.publish: acknowledged after Next became ready");
	} catch (error) {
		console.error(error);
		try {
			await settleFailure(channel, job);
			channel.ack(message);
		} catch (publishError) {
			console.error(publishError);
			channel.nack(message, false, true);
		}
		if (!child || child.exitCode !== null) spawnNext();
	}
}

async function consume() {
	if (consuming) return;
	consuming = true;
	try {
		const connection = await amqp.connect(RABBITMQ_URL);
		connection.on("error", (error) => {
			console.error(`RabbitMQ connection error: ${error.message}`);
		});
		connection.on("close", () => {
			consuming = false;
			console.error("RabbitMQ connection closed. Reconnecting in 2s.");
			scheduleConsume();
		});
		const channel = await connection.createConfirmChannel();
		await assertPublishTopology(channel);
		await channel.prefetch(1);
		await channel.consume(
			WORK_QUEUE,
			(message) => {
				if (message) void handleJob(channel, message);
			},
			{ noAck: false }
		);
		console.log(`Consuming ${WORK_QUEUE} from ${RABBITMQ_URL}`);
	} catch (error) {
		consuming = false;
		console.error(
			`RabbitMQ is not available (${error instanceof Error ? error.message : error}). Retrying in 2s.`
		);
		scheduleConsume();
	}
}

function scheduleConsume() {
	if (reconnectTimer) return;
	reconnectTimer = setTimeout(() => {
		reconnectTimer = null;
		void consume();
	}, 2000);
}

// A rebuild from the previous file-based handoff may already be waiting.
if (fs.existsSync(ready) && fs.existsSync(staging)) {
	try {
		claimStaging();
		promoteIncoming();
	} catch (error) {
		console.error(error);
	}
}

spawnNext();
void consume();
