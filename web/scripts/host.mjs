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
import { fileURLToPath } from "node:url";
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

// PM2's working directory is often the repo root. The Next app lives next to
// this script, and both the build and `next start` have to use that folder.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
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
let startFailures = 0;

function hasProductionBuild(dir) {
	return fs.existsSync(path.join(dir, "BUILD_ID"));
}

/** Put the last good build back when a swap left `.next` without BUILD_ID. */
function restorePreviousBuild() {
	if (hasProductionBuild(live)) return true;
	if (!hasProductionBuild(previous)) return false;
	fs.rmSync(live, { recursive: true, force: true });
	fs.renameSync(previous, live);
	console.error(`Restored the previous production build into ${live}`);
	return true;
}

function writeStatus(status) {
	fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
}

function readStatus() {
	try {
		return JSON.parse(fs.readFileSync(statusPath, "utf8"));
	} catch {
		return {};
	}
}

function spawnNext() {
	if (!hasProductionBuild(live) && !restorePreviousBuild()) {
		console.error(
			`No production build in ${live}. The host stays up so the queue can still build one.`
		);
		return null;
	}
	if (startFailures >= 3) {
		console.error(
			"next start failed repeatedly. Waiting for the next successful publish before trying again."
		);
		return null;
	}

	const env = { ...process.env, INTAKE_HOST: "1" };
	delete env.BUILD_DIR;
	delete env.TYPEPONENTS_DIST_DIR;
	fs.rmSync(path.join(root, ".next-dist-dir"), { force: true });
	const next = spawn(process.execPath, [nextBin, "start", "-p", port], {
		cwd: root,
		env,
		stdio: ["ignore", "pipe", "pipe"],
	});
	let readySeen = false;
	/** @type {Array<() => void>} */
	const waiters = [];
	/** @type {Array<(error: Error) => void>} */
	const exitWaiters = [];
	const note = (chunk, stream) => {
		stream.write(chunk);
		const text = chunk.toString();
		if (text.includes("Could not find a production build")) {
			console.error(text.trim());
		}
		if (!readySeen && text.includes("Ready")) {
			readySeen = true;
			startFailures = 0;
			for (const resolve of waiters.splice(0)) resolve();
		}
	};
	next.stdout.on("data", (chunk) => note(chunk, process.stdout));
	next.stderr.on("data", (chunk) => note(chunk, process.stderr));
	next.on("exit", (code, signal) => {
		const error = new Error(
			`next start exited (${signal ?? code}) before it was ready`
		);
		for (const reject of exitWaiters.splice(0)) reject(error);
		if (swapping || readySeen) return;
		startFailures += 1;
		console.error(
			`${error.message}. Host is staying up. Restoring the last good build if this one is incomplete.`
		);
		if (!hasProductionBuild(live)) restorePreviousBuild();
		setTimeout(() => {
			if (!child || child.exitCode !== null) spawnNext();
		}, 1000).unref();
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
			exitWaiters.push((error) => {
				clearTimeout(timer);
				reject(error);
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
		if (!hasProductionBuild(staging)) {
			reject(
				new Error(
					"The rebuild finished without .next-staging/BUILD_ID, so the live site was left running."
				)
			);
			return;
		}
		swapping = true;
		startFailures = 0;
		let settled = false;

		const fail = (error) => {
			if (settled) return;
			settled = true;
			swapping = false;
			if (!hasProductionBuild(live)) restorePreviousBuild();
			if (!child || child.exitCode !== null) spawnNext();
			reject(error);
		};

		try {
			claimStaging();
		} catch (error) {
			fail(error);
			return;
		}

		const finish = () => {
			try {
				promoteIncoming();
			} catch (error) {
				fail(error);
				return;
			}
			if (!hasProductionBuild(live)) {
				fail(
					new Error(
						"The swapped directory is not a production build, so the previous one was restored."
					)
				);
				return;
			}
			const next = spawnNext();
			if (!next) {
				fail(new Error("next start was not launched."));
				return;
			}
			next.waitUntilReady(120_000).then(() => {
				if (settled) return;
				settled = true;
				swapping = false;
				resolve();
			}, fail);
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
	const status = readStatus();
	const error =
		typeof status.error === "string" ? status.error : "Site rebuild failed.";
	const previousLog = typeof status.log === "string" ? status.log : "";
	if (job.attempt < MAX_ATTEMPTS) {
		const nextAttempt = job.attempt + 1;
		const retryLine = `Retry ${nextAttempt} of ${MAX_ATTEMPTS} in ${RETRY_TTL_MS / 1000}s.`;
		writeStatus({
			state: "running",
			startedAt: new Date().toISOString(),
			error,
			log: previousLog
				? `${previousLog.trimEnd()}\n\n${retryLine}\n`
				: `${error}\n${retryLine}\n`,
		});
		await enqueueJob(channel, { slug: job.slug, attempt: nextAttempt });
		return;
	}
	await enqueueDeadLetter(channel, job, error);
	writeStatus({
		state: "error",
		finishedAt: new Date().toISOString(),
		error: `${error} Gave up after ${MAX_ATTEMPTS} attempts. The message is on ${DLQ}.`,
		log: previousLog || error,
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
