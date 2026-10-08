import { catalog } from "@/registry/__generated__/catalog";
import type { CatalogEntry } from "@/registry/types";

import { mergeStoredComponent, type StoredComponent } from "./stored-component";

type ComponentPage = {
	total: number;
	items: StoredComponent[];
};

function apiBase(): string {
	return (
		process.env.API_URL ??
		process.env.NEXT_PUBLIC_API_URL ??
		"http://localhost:3030"
	);
}

async function readJson<T>(path: string): Promise<T | null> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 2000);
	try {
		const response = await fetch(`${apiBase()}${path}`, {
			cache: "no-store",
			signal: controller.signal,
		});
		if (!response.ok) return null;
		return (await response.json()) as T;
	} catch {
		return null;
	} finally {
		clearTimeout(timer);
	}
}

export async function loadStoredComponent(
	slug: string
): Promise<StoredComponent | null> {
	return readJson<StoredComponent>(
		`/components/${encodeURIComponent(slug)}`
	);
}

/** Every stored row, or an empty map when the API is down or unseeded. */
export async function loadStoredComponents(): Promise<Map<string, StoredComponent>> {
	const stored = new Map<string, StoredComponent>();
	const limit = 1000;
	let offset = 0;

	for (;;) {
		const page = await readJson<ComponentPage>(
			`/components?hidden=all&limit=${limit}&offset=${offset}`
		);
		if (!page) return stored;
		for (const item of page.items ?? []) stored.set(item.slug, item);
		offset += page.items?.length ?? 0;
		if (offset >= page.total || (page.items?.length ?? 0) === 0) break;
	}

	return stored;
}

/**
 * Applies database metadata on top of the generated catalog, then drops rows
 * the database has hidden or gated for this session.
 */
export async function catalogWithStoredValues(
	unlocked: boolean
): Promise<CatalogEntry[]> {
	const stored = await loadStoredComponents();
	if (stored.size === 0) {
		return catalog.filter(
			(entry) => !entry.hidden && (unlocked || !entry.gated)
		);
	}

	return catalog
		.map((entry) => {
			const row = stored.get(entry.slug);
			return row ? mergeStoredComponent(entry, row) : entry;
		})
		.filter((entry) => !entry.hidden && (unlocked || !entry.gated));
}

export async function entryWithStoredValues(
	slug: string
): Promise<CatalogEntry | null> {
	const entry = catalog.find((item) => item.slug === slug);
	if (!entry) return null;
	const stored = await loadStoredComponent(slug);
	return stored ? mergeStoredComponent(entry, stored) : entry;
}
