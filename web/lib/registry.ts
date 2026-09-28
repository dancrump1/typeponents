import fs from "node:fs";
import path from "node:path";

import { isLibraryUnlocked } from "@/lib/gate-server";
import { catalog, catalogBySlug } from "@/registry/__generated__/catalog";
import { CATEGORIES } from "@/registry/schema";
import type { Category, CatalogEntry } from "@/registry/types";

export { catalog, catalogBySlug };
export type { CatalogEntry, Category };

const COMPONENTS_DIR = path.join(process.cwd(), "registry", "components");
const PRIVATE_R_DIR = path.join(
	process.cwd(),
	"registry",
	"__generated__",
	"private",
	"r"
);
const PRIVATE_DOCS_DIR = path.join(
	process.cwd(),
	"registry",
	"__generated__",
	"private",
	"docs"
);

/** Public catalog: hidden and license-gated components stay out. */
export const visibleCatalog = catalog.filter((c) => !c.hidden && !c.gated);

/** Same as the public catalog, plus gated items for an unlocked session. */
export const unlockedCatalog = catalog.filter((c) => !c.hidden);

export const gatedCount = catalog.filter((c) => !c.hidden && c.gated).length;

export async function catalogForRequest() {
	const unlocked = await isLibraryUnlocked();
	return {
		unlocked,
		entries: unlocked ? unlockedCatalog : visibleCatalog,
	};
}

// ---------------------------------------------------------------------------
// Grouping
// ---------------------------------------------------------------------------

export type CategoryGroup = {
	category: Category;
	entries: CatalogEntry[];
};

/**
 * Groups by primary category (the first one listed), so every component
 * appears exactly once and the index reads like a table of contents.
 */
export function groupByCategory(entries: CatalogEntry[]): CategoryGroup[] {
	const map = new Map<Category, CatalogEntry[]>();
	for (const entry of entries) {
		const primary = entry.categories[0];
		if (!map.has(primary)) map.set(primary, []);
		map.get(primary)!.push(entry);
	}
	return CATEGORIES.filter((c) => map.has(c)).map((category) => ({
		category,
		entries: map
			.get(category)!
			.sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title)),
	}));
}

// ---------------------------------------------------------------------------
// Facets
// ---------------------------------------------------------------------------

export type Facet = { value: string; label: string; count: number };

const countBy = (entries: CatalogEntry[], pick: (e: CatalogEntry) => string[]) => {
	const counts = new Map<string, number>();
	for (const entry of entries) {
		for (const value of pick(entry)) {
			counts.set(value, (counts.get(value) ?? 0) + 1);
		}
	}
	return counts;
};

const toFacets = (counts: Map<string, number>): Facet[] =>
	[...counts.entries()]
		.map(([value, count]) => ({ value, label: value, count }))
		.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

/**
 * All the dimensions the index can filter on, with counts, derived from the
 * catalog rather than hand-maintained lists.
 */
export function buildFacets(entries: CatalogEntry[] = visibleCatalog) {
	return {
		categories: toFacets(countBy(entries, (e) => e.categories)),
		sources: toFacets(
			countBy(entries, (e) => (e.inspiration?.source ? [e.inspiration.source] : []))
		),
		behaviours: toFacets(countBy(entries, (e) => e.tags)),
		dependencies: toFacets(countBy(entries, (e) => e.dependencies)),
		statuses: toFacets(countBy(entries, (e) => [e.status])),
	};
}

// ---------------------------------------------------------------------------
// Source reading (server only)
// ---------------------------------------------------------------------------

export type SourceFile = {
	/** Path as the consumer will see it after install. */
	path: string;
	/** Path inside this repo. */
	localPath: string;
	language: "tsx" | "ts" | "css" | "json";
	content: string;
};

const languageOf = (file: string): SourceFile["language"] => {
	if (file.endsWith(".css")) return "css";
	if (file.endsWith(".json")) return "json";
	if (file.endsWith(".tsx")) return "tsx";
	return "ts";
};

function registryItemPath(slug: string): string | null {
	const publicPath = path.join(process.cwd(), "public", "r", `${slug}.json`);
	if (fs.existsSync(publicPath)) return publicPath;
	const privatePath = path.join(PRIVATE_R_DIR, `${slug}.json`);
	return fs.existsSync(privatePath) ? privatePath : null;
}

/** Reads the installable payload straight from the built registry item. */
export function readRegistryItem(slug: string): {
	files: SourceFile[];
	dependencies: string[];
	registryDependencies: string[];
} | null {
	const itemPath = registryItemPath(slug);
	if (!itemPath) return null;

	const item = JSON.parse(fs.readFileSync(itemPath, "utf8"));
	return {
		files: (item.files ?? []).map(
			(f: { path: string; content: string }): SourceFile => ({
				path: f.path,
				localPath: f.path,
				language: languageOf(f.path),
				content: f.content ?? "",
			})
		),
		dependencies: item.dependencies ?? [],
		registryDependencies: item.registryDependencies ?? [],
	};
}

/** All demo files for a component, canonical one first. */
export function readDemos(slug: string): SourceFile[] {
	const dir = path.join(COMPONENTS_DIR, slug);
	if (!fs.existsSync(dir)) return [];

	return fs
		.readdirSync(dir)
		.filter((f) => /^demo(-.*)?\.tsx$/.test(f))
		.sort((a, b) => (a === "demo.tsx" ? -1 : b === "demo.tsx" ? 1 : a.localeCompare(b)))
		.map((f) => ({
			path: f,
			localPath: path.join("registry", "components", slug, f),
			language: "tsx" as const,
			content: fs.readFileSync(path.join(dir, f), "utf8"),
		}));
}

/** The pre-rendered markdown an agent should receive. */
export function readAgentDoc(slug: string): string | null {
	const publicPath = path.join(process.cwd(), "public", "docs", `${slug}.md`);
	if (fs.existsSync(publicPath)) return fs.readFileSync(publicPath, "utf8");
	const privatePath = path.join(PRIVATE_DOCS_DIR, `${slug}.md`);
	return fs.existsSync(privatePath) ? fs.readFileSync(privatePath, "utf8") : null;
}

// ---------------------------------------------------------------------------
// Install commands
// ---------------------------------------------------------------------------

export {
	PACKAGE_MANAGERS,
	installCommand,
	type PackageManager,
} from "./registry-shared";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Adapters for the v0 generate UI
// ---------------------------------------------------------------------------

/**
 * The `files` and `categories` shapes the v0 chat components were written
 * against, served from the new catalog. Keeps that feature working without
 * rewriting its internals now that the old data layer is gone.
 */
export function catalogAsFileList() {
	return visibleCatalog.map((entry) => ({
		name: `${entry.slug}.json`,
		title: entry.title,
		rating: entry.rating,
		category: entry.categories[0],
	}));
}

export function catalogAsCategoryMap(): Record<string, string[]> {
	const out: Record<string, string[]> = {
		All: visibleCatalog.map((entry) => entry.slug),
	};
	for (const entry of visibleCatalog) {
		for (const category of entry.categories) {
			(out[category] ??= []).push(entry.slug);
		}
	}
	return out;
}

export function neighbours(slug: string, list: CatalogEntry[] = visibleCatalog) {
	const index = list.findIndex((c) => c.slug === slug);
	if (index === -1) return { previous: null, next: null, index: -1, total: list.length };
	return {
		previous: index > 0 ? list[index - 1] : null,
		next: index < list.length - 1 ? list[index + 1] : null,
		index,
		total: list.length,
	};
}
