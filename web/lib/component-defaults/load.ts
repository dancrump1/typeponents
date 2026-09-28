import fs from "fs";
import path from "path";

import type { ComponentDefaultsFile, ComponentDefaultsManifest } from "./types";

const defaultsDir = path.join(process.cwd(), "data/component-defaults");
const manifestPath = path.join(defaultsDir, "manifest.json");

const cache = new Map<string, ComponentDefaultsFile>();

export function getComponentDefaultsPath(slug: string) {
	return path.join(defaultsDir, `${slug}.json`);
}

export function loadComponentDefaults(slug: string): ComponentDefaultsFile | null {
	const cached = cache.get(slug);
	if (cached) return cached;

	const filePath = getComponentDefaultsPath(slug);
	if (!fs.existsSync(filePath)) return null;

	const parsed = JSON.parse(
		fs.readFileSync(filePath, "utf8")
	) as ComponentDefaultsFile;
	cache.set(slug, parsed);
	return parsed;
}

export function loadComponentDefaultsManifest(): ComponentDefaultsManifest | null {
	if (!fs.existsSync(manifestPath)) return null;
	return JSON.parse(fs.readFileSync(manifestPath, "utf8")) as ComponentDefaultsManifest;
}

export function listComponentDefaultSlugs(): string[] {
	if (!fs.existsSync(defaultsDir)) return [];
	return fs
		.readdirSync(defaultsDir)
		.filter((file) => file.endsWith(".json") && file !== "manifest.json")
		.map((file) => file.replace(/\.json$/, ""))
		.sort();
}
