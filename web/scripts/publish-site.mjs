/**
 * Rebuilds the registry, then compiles Next into .next-staging.
 *
 * `npm run build` pins BUILD_DIR=.next, which is the directory the live
 * server is reading. This script calls `next build` directly so the running
 * site stays up until scripts/host.mjs swaps the new build in.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const statusPath = path.join(root, ".intake-publish-status.json");
const readyPath = path.join(root, ".intake-publish-ready");
const lockPath = path.join(root, ".intake.lock");
const tsx = path.join(root, "node_modules", ".bin", "tsx");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

const startedAt = new Date().toISOString();
let log = "";

function writeStatus(state, extra = {}) {
	fs.writeFileSync(
		statusPath,
		JSON.stringify({ state, startedAt, log, ...extra }, null, 2)
	);
}

function missingPackages(text) {
	const names = new Set();
	for (const match of text.matchAll(/^\s*(?:Fix with:\s*)?npm install\s+(.+)$/gm)) {
		for (const name of match[1].trim().split(/\s+/)) {
			if (/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/i.test(name)) {
				names.add(name);
			}
		}
	}
	return [...names];
}

function run(command, args, env) {
	return new Promise((resolve) => {
		const child = spawn(command, args, {
			cwd: root,
			env,
			stdio: ["ignore", "pipe", "pipe"],
		});
		const append = (chunk) => {
			log += chunk.toString();
			if (log.length > 24_000) log = log.slice(-24_000);
		};
		child.stdout.on("data", append);
		child.stderr.on("data", append);
		const flush = setInterval(() => writeStatus("running"), 1000);
		child.on("close", (code) => {
			clearInterval(flush);
			resolve(code ?? 1);
		});
		child.on("error", (error) => {
			clearInterval(flush);
			append(`\n${error.message}\n`);
			resolve(1);
		});
	});
}

// A previous rebuild may still be waiting for host.mjs to claim .next-staging.
// Starting another build before that claim would delete the signal file.
const claimDeadline = Date.now() + 15_000;
while (fs.existsSync(readyPath) && Date.now() < claimDeadline) {
	await new Promise((resolve) => setTimeout(resolve, 200));
}
fs.rmSync(readyPath, { force: true });
writeStatus("running");

const registryCode = await run(tsx, ["scripts/v2/build.mts"], process.env);
if (registryCode !== 0) {
	fs.rmSync(lockPath, { force: true });
	writeStatus("error", {
		finishedAt: new Date().toISOString(),
		error: "Rebuilding the registry catalog failed.",
	});
	process.exit(registryCode);
}

const missing = missingPackages(log);
if (missing.length) {
	const installCode = await run(
		"npm",
		["install", "--no-audit", "--no-fund", ...missing],
		process.env
	);
	if (installCode !== 0) {
		fs.rmSync(lockPath, { force: true });
		writeStatus("error", {
			finishedAt: new Date().toISOString(),
			error: `Installing ${missing.join(", ")} failed, so the live site was left unchanged.`,
		});
		process.exit(installCode);
	}
}

const buildEnv = { ...process.env, BUILD_DIR: ".next-staging" };
const buildCode = await run(process.execPath, [nextBin, "build"], buildEnv);
fs.rmSync(lockPath, { force: true });

if (buildCode !== 0) {
	writeStatus("error", {
		finishedAt: new Date().toISOString(),
		error: "The Next.js build failed, so the live site was left unchanged.",
	});
	process.exit(buildCode);
}

fs.writeFileSync(readyPath, new Date().toISOString());
writeStatus("ready", { finishedAt: new Date().toISOString() });
