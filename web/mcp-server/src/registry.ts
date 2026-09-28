import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type CatalogEntry = {
	name: string;
	title: string;
	description: string;
	rating: number;
	hidden: boolean;
	tags: string[];
	category: string;
	registryUrl: string;
};

export type RegistryItemFile = {
	path: string;
	content?: string;
	type?: string;
	target?: string;
};

export type RegistryItem = {
	name: string;
	title?: string;
	description?: string;
	files?: RegistryItemFile[];
};

const moduleDir = path.dirname(fileURLToPath(import.meta.url));

function resolveRegistryRoot(): string | null {
	const fromEnv = process.env.REGISTRY_ROOT?.trim();
	if (fromEnv) return path.resolve(fromEnv);

	const repoRoot = path.resolve(moduleDir, "..", "..");
	const indexPath = path.join(repoRoot, "public", "r", "index.json");
	if (fs.existsSync(indexPath)) return repoRoot;
	return null;
}

export const REGISTRY_ROOT = resolveRegistryRoot();
export const REGISTRY_BASE = (
	process.env.REGISTRY_BASE_URL || "https://components.drivedev.net"
).replace(/\/$/, "");

export function registrySource(): "local" | "remote" {
	return REGISTRY_ROOT ? "local" : "remote";
}

let animatedCatalogCache: CatalogEntry[] | null = null;
let uiCatalogCache: CatalogEntry[] | null = null;

function parseCatalog(raw: unknown): CatalogEntry[] {
	if (Array.isArray(raw)) return raw as CatalogEntry[];
	if (raw && typeof raw === "object" && "items" in raw) {
		return ((raw as { items?: CatalogEntry[] }).items ?? []) as CatalogEntry[];
	}
	return [];
}

async function readLocalJson<T>(relativePath: string): Promise<T> {
	if (!REGISTRY_ROOT) {
		throw new Error("REGISTRY_ROOT is not set and local registry was not found");
	}
	const filePath = path.join(REGISTRY_ROOT, relativePath);
	const text = await fsp.readFile(filePath, "utf-8");
	return JSON.parse(text) as T;
}

async function fetchRemoteJson<T>(url: string): Promise<T> {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Failed to fetch ${url} (${res.status})`);
	}
	return (await res.json()) as T;
}

async function loadCatalogJson(prefix: "r" | "r-ui"): Promise<CatalogEntry[]> {
	if (REGISTRY_ROOT) {
		const raw = await readLocalJson<unknown>(`public/${prefix}/index.json`);
		return parseCatalog(raw);
	}
	const raw = await fetchRemoteJson<unknown>(`${REGISTRY_BASE}/${prefix}/index.json`);
	return parseCatalog(raw);
}

export async function loadCatalog(
	kind: "animated" | "ui-basic"
): Promise<CatalogEntry[]> {
	if (kind === "animated" && animatedCatalogCache) return animatedCatalogCache;
	if (kind === "ui-basic" && uiCatalogCache) return uiCatalogCache;

	const prefix = kind === "ui-basic" ? "r-ui" : "r";
	const data = await loadCatalogJson(prefix);
	if (kind === "animated") animatedCatalogCache = data;
	else uiCatalogCache = data;
	return data;
}

export async function fetchRegistryItem(
	name: string,
	prefix: "r" | "r-ui" = "r"
): Promise<RegistryItem> {
	if (REGISTRY_ROOT) {
		try {
			return await readLocalJson<RegistryItem>(`public/${prefix}/${name}.json`);
		} catch {
			throw new Error(`Component "${name}" not found in local registry`);
		}
	}

	const res = await fetch(`${REGISTRY_BASE}/${prefix}/${name}.json`);
	if (!res.ok) {
		throw new Error(`Component "${name}" not found (${res.status})`);
	}
	return (await res.json()) as RegistryItem;
}

export function installUrl(name: string, prefix: "r" | "r-ui"): string {
	if (REGISTRY_ROOT) {
		return path.join(REGISTRY_ROOT, "public", prefix, `${name}.json`);
	}
	return `${REGISTRY_BASE}/${prefix}/${name}.json`;
}

export function pullFiles(item: RegistryItem): Array<{
	sourcePath: string;
	suggestedPath: string;
	type?: string;
	content: string;
}> {
	if (!item.files?.length) return [];

	return item.files
		.filter((file) => file.content)
		.map((file) => ({
			sourcePath: file.path,
			suggestedPath: normalizeTargetPath(file),
			type: file.type,
			content: file.content!,
		}));
}

/**
 * The registry build emits consumer-relative paths directly
 * (components/ui/…, hooks/…, lib/…), so there is nothing left to guess. The
 * `~/` prefix is only still handled for items built by older versions.
 */
function normalizeTargetPath(file: RegistryItemFile): string {
	return (file.target ?? file.path).replace(/^~\//, "");
}
