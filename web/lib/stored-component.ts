import type { CatalogEntry, Inspiration } from "@/registry/types";

/** One component row from the Nest library API, without source files. */
export type StoredComponent = {
	slug: string;
	title: string;
	description: string;
	interaction: string;
	primaryCategory: string;
	categories: string[];
	tags: string[];
	inspiration: Inspiration | null;
	inspirationSource: string | null;
	dependencies: string[];
	registryDependencies: string[];
	props: CatalogEntry["props"];
	risk: CatalogEntry["risk"];
	rating: number;
	status: CatalogEntry["status"];
	hidden: boolean;
	gated: boolean;
	importPath: string;
	registryUrl: string;
	files: string[];
};

const RELATIONSHIPS = ["port", "adaptation", "inspired-by", "original"] as const;

/**
 * Database values win over the generated catalog so an edit survives refresh.
 * Slug and the preview stay tied to the registry folder.
 */
export function mergeStoredComponent(
	entry: CatalogEntry,
	stored: StoredComponent
): CatalogEntry {
	const categories =
		stored.categories?.length > 0
			? (stored.categories as CatalogEntry["categories"])
			: entry.categories;

	return {
		...entry,
		title: stored.title || entry.title,
		description: stored.description ?? "",
		interaction: stored.interaction ?? "",
		categories,
		tags: stored.tags ?? [],
		inspiration: normalizeInspiration(stored.inspiration),
		dependencies: stored.dependencies ?? [],
		registryDependencies: stored.registryDependencies ?? [],
		props: stored.props ?? [],
		risk: stored.risk ?? entry.risk,
		rating: stored.rating ?? entry.rating,
		status: stored.status ?? entry.status,
		hidden: stored.hidden,
		gated: stored.gated,
		importPath: stored.importPath || entry.importPath,
		registryUrl: stored.registryUrl || entry.registryUrl,
		files: stored.files ?? entry.files,
	};
}

function normalizeInspiration(inspiration: Inspiration | null): Inspiration | null {
	if (!inspiration) return null;
	const relationship = RELATIONSHIPS.includes(
		inspiration.relationship as (typeof RELATIONSHIPS)[number]
	)
		? inspiration.relationship
		: "inspired-by";
	return { ...inspiration, relationship };
}
