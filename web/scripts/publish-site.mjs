/**
 * Rebuilds the registry, installs any missing npm packages, then compiles
 * Next into .next-staging. The host process consumes site.publish, and only
 * swaps this build in after this script exits 0.
 *
 * `npm run build` pins BUILD_DIR=.next, which is the directory the live
 * server is reading. This script calls `next build` directly so the running
 * site stays up until the host restarts it.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const statusPath = path.join(root, ".intake-publish-status.json");
const distMarker = path.join(root, ".next-dist-dir");
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

function logTail(text, maxLines = 40) {
	return text
		.trim()
		.split(/\r?\n/)
		.filter((line) => line.trim())
		.slice(-maxLines)
		.join("\n");
}

function failPublish(message, code = 1) {
	const tail = logTail(log);
	writeStatus("error", {
		finishedAt: new Date().toISOString(),
		error: tail ? `${message}\n\n${tail}` : message,
	});
	process.exit(code);
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

function buildIdMtime(dir) {
	try {
		return fs.statSync(path.join(dir, "BUILD_ID")).mtimeMs;
	} catch {
		return 0;
	}
}

function run(command, args, env) {
	return new Promise((resolve) => {
		const child = spawn(command, args, {
			cwd: root,
			env,
			stdio: ["ignore", "pipe", "pipe"],
		});
		const append = (chunk, stream) => {
			stream.write(chunk);
			log += chunk.toString();
			if (log.length > 80_000) log = log.slice(-80_000);
		};
		child.stdout.on("data", (chunk) => append(chunk, process.stdout));
		child.stderr.on("data", (chunk) => append(chunk, process.stderr));
		const flush = setInterval(() => writeStatus("running"), 1000);
		child.on("close", (code) => {
			clearInterval(flush);
			resolve(code ?? 1);
		});
		child.on("error", (error) => {
			clearInterval(flush);
			append(Buffer.from(`\n${error.message}\n`), process.stderr);
			resolve(1);
		});
	});
}

writeStatus("running");

if (!fs.existsSync(tsx)) {
	failPublish(
		`tsx is missing at ${tsx}. Run npm install in the web folder, then retry.`
	);
}
if (!fs.existsSync(nextBin)) {
	failPublish(
		`Next.js is missing at ${nextBin}. Run npm install in the web folder, then retry.`
	);
}

const registryCode = await run(tsx, ["scripts/v2/build.mts"], process.env);
if (registryCode !== 0) {
	failPublish("Rebuilding the registry catalog failed.", registryCode);
}

const missing = missingPackages(log);
if (missing.length) {
	const installCode = await run(
		"npm",
		["install", "--no-audit", "--no-fund", ...missing],
		process.env
	);
	if (installCode !== 0) {
		failPublish(
			`Installing ${missing.join(", ")} failed, so the live site was left unchanged.`,
			installCode
		);
	}
}

const stagingDir = path.join(root, ".next-staging");
const liveDir = path.join(root, ".next");
const liveMtimeBefore = buildIdMtime(liveDir);

fs.rmSync(stagingDir, { recursive: true, force: true });
fs.writeFileSync(distMarker, ".next-staging\n");

const buildEnv = {
	...process.env,
	BUILD_DIR: ".next-staging",
	TYPEPONENTS_DIST_DIR: ".next-staging",
};

let buildCode = 1;
try {
	buildCode = await run(process.execPath, [nextBin, "build"], buildEnv);
} finally {
	fs.rmSync(distMarker, { force: true });
}

const stagingId = path.join(stagingDir, "BUILD_ID");
if (buildCode !== 0 || !fs.existsSync(stagingId)) {
	const liveTouched = buildIdMtime(liveDir) > liveMtimeBefore;
	const hint = liveTouched
		? " The compiler wrote into .next (the live directory) instead of .next-staging."
		: "";
	failPublish(
		`The Next.js build did not produce .next-staging/BUILD_ID, so the live site was left unchanged.${hint}`,
		buildCode || 1
	);
}

writeStatus("ready", { finishedAt: new Date().toISOString() });
