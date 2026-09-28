import { NextResponse, type NextRequest } from "next/server";

import { isLibraryUnlocked } from "@/lib/gate-server";
import { catalog, unlockedCatalog, visibleCatalog } from "@/lib/registry";

/**
 * Machine-readable catalog. Filters mirror the ones on /library so an agent can
 * ask the same questions a designer can.
 */
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const minRating = Number(searchParams.get("minRating") ?? "0");
	const includeHidden = searchParams.get("includeHidden") === "true";
	const category = searchParams.get("category");
	const source = searchParams.get("source");
	const q = (searchParams.get("q") ?? "").toLowerCase().trim();
	const unlocked = await isLibraryUnlocked();

	let items = includeHidden && unlocked ? catalog : unlocked
		? unlockedCatalog
		: visibleCatalog;

	if (minRating > 0) items = items.filter((e) => e.rating >= minRating);
	if (category) items = items.filter((e) => e.categories.includes(category as never));
	if (source) items = items.filter((e) => e.inspiration?.source === source);

	if (q) {
		items = items.filter((entry) =>
			[
				entry.slug,
				entry.title,
				entry.description,
				entry.interaction,
				entry.inspiration?.source ?? "",
				...entry.tags,
				...entry.categories,
				...entry.dependencies,
			]
				.join(" ")
				.toLowerCase()
				.includes(q)
		);
	}

	return NextResponse.json({
		count: items.length,
		items: items.map((entry) => ({
			name: entry.slug,
			title: entry.title,
			description: entry.description,
			categories: entry.categories,
			tags: entry.tags,
			rating: entry.rating,
			status: entry.status,
			inspiration: entry.inspiration,
			dependencies: entry.dependencies,
			importPath: entry.importPath,
			registryUrl: entry.registryUrl,
			install: `npx shadcn@latest add ${entry.registryUrl}`,
		})),
	});
}
