import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { CATEGORIES, type Category } from "@/registry/schema";

export type IntakeRestart = "dev" | "automatic" | "manual";

export type IntakeResult =
	| { ok: true; slug: string; log: string; restart: IntakeRestart }
	| { ok: false; error: string; log: string };

export type PublishState = "idle" | "running" | "ready" | "error";

export type PublishStatus = {
	state: PublishState;
	startedAt?: string;
	finishedAt?: string;
	error?: string;
	log?: string;
};

const LOCK_PATH = path.join(process.cwd(), ".intake.lock");
const STATUS_PATH = path.join(process.cwd(), ".intake-publish-status.json");
const LOCK_MAX_AGE_MS = 20 * 60 * 1000;

type LockFile = { pid: number; startedAt: number; label: string };

function tsxBin(): string {
	return path.join(process.cwd(), "node_modules", ".bin", "tsx");
}

function publishScript(): string {
	return path.join(process.cwd(), "scripts", "publish-site.mjs");
}

export function parseRegistryUrl(raw: string): string | null {
	let url: URL;
	try {
		url = new URL(raw.trim());
	} catch {
		return null;
	}
	if (url.protocol !== "http:" && url.protocol !== "https:") return null;
	return url.href;
}

export function parseCategory(raw: string): Category | null {
	const category = raw.trim();
	if (!(CATEGORIES as readonly string[]).includes(category)) return null;
	return category as Category;
}

export function parseSlug(raw: string): string | null {
	const slug = raw.trim();
	if (!slug) return "";
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
	return slug;
}

export function readPublishStatus(): PublishStatus {
	try {
		const parsed = JSON.parse(fs.readFileSync(STATUS_PATH, "utf8")) as PublishStatus;
		if (
			parsed.state === "running" ||
			parsed.state === "ready" ||
			parsed.state === "error"
		) {
			return parsed;
		}
	} catch {
		// No publish has run yet.
	}
	return { state: "idle" };
}

/**
 * Runs registry intake, then refreshes generated catalog files.
 * On a production server, also starts a site rebuild so the compiled
 * catalog and demo preview include the new component.
 */
export async function importRegistryItem(input: {
	url: string;
	category: Category;
	slug: string;
}): Promise<IntakeResult> {
	acquireLock("intake");
	let handoff = false;
	try {
		const args = ["scripts/v2/intake.mts", input.url, "--category", input.category];
		if (input.slug) args.push("--slug", input.slug);

		const intake = await runCommand(tsxBin(), args, 120_000);
		const intakeLog = combine(intake);
		if (intake.code !== 0) {
			return { ok: false, error: intakeError(intake), log: intakeLog };
		}

		const slug = slugFromOutput(intake.stdout) ?? (input.slug || null);
		if (!slug) {
			return {
				ok: false,
				error: "Intake finished without reporting a component slug.",
				log: intakeLog,
			};
		}

		const installed = await installMissingPackages(intake.stdout);
		const logAfterInstall = [intakeLog, installed.log].filter(Boolean).join("\n\n");
		if (!installed.ok) {
			return { ok: false, error: installed.error, log: logAfterInstall };
		}

		if (process.env.NODE_ENV !== "production") {
			const built = await runCommand(tsxBin(), ["scripts/v2/build.mts"], 180_000);
			let log = [logAfterInstall, combine(built)].filter(Boolean).join("\n\n");
			if (built.code !== 0) {
				return {
					ok: false,
					error:
						"The component files were saved, but rebuilding the catalog failed. The library will not list it until that build succeeds.",
					log,
				};
			}
			const builtInstall = await installMissingPackages(combine(built));
			log = [log, builtInstall.log].filter(Boolean).join("\n\n");
			if (!builtInstall.ok) {
				return { ok: false, error: builtInstall.error, log };
			}
			return { ok: true, slug, log, restart: "dev" };
		}

		startPublish();
		handoff = true;
		return {
			ok: true,
			slug,
			log: logAfterInstall,
			restart: process.env.INTAKE_HOST === "1" ? "automatic" : "manual",
		};
	} finally {
		if (!handoff) releaseLock();
	}
}

/** Runs another production rebuild after a failed publish. */
export function republishSite(): void {
	if (process.env.NODE_ENV !== "production") {
		throw new Error("The dev server picks up new components without a site rebuild.");
	}
	acquireLock("publish");
	try {
		startPublish();
	} catch (error) {
		releaseLock();
		throw error;
	}
}

/** Starts the production rebuild. The publish script releases the lock. */
function startPublish(): void {
	fs.writeFileSync(
		STATUS_PATH,
		JSON.stringify({
			state: "running",
			startedAt: new Date().toISOString(),
			log: "",
		})
	);
	const child = spawn(process.execPath, [publishScript()], {
		cwd: process.cwd(),
		detached: true,
		stdio: "ignore",
		env: process.env,
	});
	child.unref();
	if (child.pid === undefined) {
		throw new Error("Could not start the site rebuild.");
	}
	writeLock({ pid: child.pid, startedAt: Date.now(), label: "publish" });
}

/** Package names intake or registry:build tells us to install. */
export function missingPackagesFromLog(log: string): string[] {
	const names = new Set<string>();
	for (const match of log.matchAll(/^\s*(?:Fix with:\s*)?npm install\s+(.+)$/gm)) {
		for (const name of match[1].trim().split(/\s+/)) {
			if (isNpmPackageName(name)) names.add(name);
		}
	}
	return [...names];
}

function isNpmPackageName(name: string): boolean {
	return /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/i.test(name);
}

async function installMissingPackages(
	log: string
): Promise<{ ok: true; log: string } | { ok: false; error: string; log: string }> {
	const missing = missingPackagesFromLog(log);
	if (missing.length === 0) return { ok: true, log: "" };

	const result = await runCommand(
		"npm",
		["install", "--no-audit", "--no-fund", ...missing],
		180_000
	);
	const installLog = combine(result);
	if (result.code !== 0) {
		return {
			ok: false,
			error: `The component was saved, but installing ${missing.join(", ")} failed.`,
			log: installLog,
		};
	}
	return { ok: true, log: installLog };
}

function slugFromOutput(stdout: string): string | null {
	const match = stdout.match(
		/registry\/components\/([a-z0-9]+(?:-[a-z0-9]+)*)\//
	);
	return match?.[1] ?? null;
}

function intakeError(result: CommandResult): string {
	const line = result.stderr
		.split("\n")
		.map((entry) => entry.trim())
		.find((entry) => entry.startsWith("intake:"));
	if (line) return line.replace(/^intake:\s*/, "");
	const tail = (result.stderr || result.stdout)
		.trim()
		.split("\n")
		.filter(Boolean)
		.slice(-4)
		.join("\n");
	return tail || "Intake failed.";
}

type CommandResult = { code: number; stdout: string; stderr: string };

function combine(result: CommandResult): string {
	return [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
}

function runCommand(
	command: string,
	args: string[],
	timeoutMs: number
): Promise<CommandResult> {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			cwd: process.cwd(),
			env: process.env,
			stdio: ["ignore", "pipe", "pipe"],
		});
		let stdout = "";
		let stderr = "";
		const timer = setTimeout(() => {
			child.kill("SIGTERM");
			reject(new Error("The command timed out."));
		}, timeoutMs);
		child.stdout.setEncoding("utf8");
		child.stderr.setEncoding("utf8");
		child.stdout.on("data", (chunk: string) => {
			stdout += chunk;
		});
		child.stderr.on("data", (chunk: string) => {
			stderr += chunk;
		});
		child.on("error", (error) => {
			clearTimeout(timer);
			reject(error);
		});
		child.on("close", (code) => {
			clearTimeout(timer);
			resolve({ code: code ?? 1, stdout, stderr });
		});
	});
}

function processAlive(pid: number): boolean {
	try {
		process.kill(pid, 0);
		return true;
	} catch {
		return false;
	}
}

function readLock(): LockFile | null {
	try {
		const parsed = JSON.parse(fs.readFileSync(LOCK_PATH, "utf8")) as LockFile;
		if (typeof parsed.pid !== "number" || typeof parsed.startedAt !== "number") {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}

function writeLock(lock: LockFile): void {
	fs.writeFileSync(LOCK_PATH, JSON.stringify(lock));
}

function acquireLock(label: string): void {
	const lock: LockFile = { pid: process.pid, startedAt: Date.now(), label };
	if (tryCreateLock(lock)) return;

	const existing = readLock();
	const stale =
		!existing ||
		!processAlive(existing.pid) ||
		Date.now() - existing.startedAt > LOCK_MAX_AGE_MS;
	if (!stale) {
		throw new Error(
			"Another import is already running. Wait for it to finish, then try again."
		);
	}

	fs.rmSync(LOCK_PATH, { force: true });
	if (!tryCreateLock(lock)) {
		throw new Error(
			"Another import is already running. Wait for it to finish, then try again."
		);
	}
}

function tryCreateLock(lock: LockFile): boolean {
	try {
		fs.writeFileSync(LOCK_PATH, JSON.stringify(lock), { flag: "wx" });
		return true;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "EEXIST") return false;
		throw error;
	}
}

function releaseLock(): void {
	fs.rmSync(LOCK_PATH, { force: true });
}
