import type {
	Category,
	Inspiration,
	PropDoc,
	Risk,
} from "@/registry/schema";

export type { Category, Inspiration, PropDoc, Risk };

/**
 * One component as the app sees it. Produced by scripts/v2/build.ts into
 * registry/__generated__/catalog.ts — never hand-edited.
 *
 * Deliberately excludes source code so importing the catalog stays cheap;
 * source is read on demand by the detail page.
 */
export type CatalogEntry = {
	slug: string;
	title: string;
	description: string;
	interaction: string;
	categories: Category[];
	tags: string[];
	inspiration: Inspiration | null;
	/** npm packages, inferred from real imports at build time. */
	dependencies: string[];
	/** shadcn primitive names and absolute URLs of sibling components. */
	registryDependencies: string[];
	props: PropDoc[];
	risk: Risk;
	rating: number;
	status: "stable" | "needs-review" | "draft";
	hidden: boolean;
	/** True when the component requires the library password to browse. */
	gated: boolean;
	/** What a consumer types to import it after installing. */
	importPath: string;
	registryUrl: string;
	/** Consumer-relative paths of every file the install writes. */
	files: string[];
};
