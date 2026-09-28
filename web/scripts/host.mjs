/**
 * Production server for the designer-facing site.
 *
 * `next start` serves a compiled catalog. After someone imports a component,
 * scripts/publish-site.mjs writes a new build to .next-staging and drops
 * .intake-publish-ready. This process swaps that build in and restarts Next
 * so the new preview is actually served.
 *
 * Run from web/: npm run host
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const live = path.join(root, ".next");
const staging = path.join(root, ".next-staging");
const incoming = path.join(root, ".next-incoming");
const previous = path.join(root, ".next-previous");
const ready = path.join(root, ".intake-publish-ready");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const port = process.env.PORT || "3008";

let child = null;
let swapping = false;

function start() {
	const env = { ...process.env, INTAKE_HOST: "1" };
	delete env.BUILD_DIR;
	child = spawn(process.execPath, [nextBin, "start", "-p", port], {
		cwd: root,
		stdio: "inherit",
		env,
	});
	child.on("exit", (code, signal) => {
		if (swapping) return;
		console.error(`next start exited (${signal ?? code}). Host is stopping.`);
		process.exit(code ?? 1);
	});
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

function restartWithStaging() {
	if (swapping || !fs.existsSync(ready) || !fs.existsSync(staging)) return;
	swapping = true;

	try {
		claimStaging();
	} catch (error) {
		console.error(error);
		swapping = false;
		return;
	}

	const finish = () => {
		try {
			promoteIncoming();
		} catch (error) {
			console.error(error);
			swapping = false;
			start();
			return;
		}
		swapping = false;
		start();
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
}

// A rebuild may already be waiting if the previous process was `next start`,
// which cannot swap itself out.
if (fs.existsSync(ready) && fs.existsSync(staging)) {
	claimStaging();
	promoteIncoming();
}

start();
setInterval(restartWithStaging, 2000);
