import { z } from "zod";

/**
 * Single source of truth for component metadata.
 *
 * Every component owns a `meta.ts` in its own folder that calls
 * `defineComponent`. Nothing else in the repo may declare categories,
 * ratings, credits or risk flags — the build reads these files and nothing
 * else.
 */

/** Closed taxonomy. Adding a category is a deliberate edit here. */
export const CATEGORIES = [
	"3D & Canvas",
	"Accordions",
	"Backgrounds",
	"Buttons",
	"Cards",
	"Carousels",
	"Cursor & Pointer Effects",
	"Data & Tables",
	"Footers",
	"Forms & Inputs",
	"Games",
	"Grids & Layouts",
	"Images",
	"Loaders",
	"Media Galleries",
	"Modals",
	"Navigation",
	"Scroll",
	"Special Effects & FX",
	"Testimonials",
	"Text",
	"Text Animations",
	/** Triage bucket. Components here are surfaced in the UI as needing a home. */
	"Uncategorized",
	"Utilities",
	"Videos",
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * Inspiration sources whose ports are gated by default. Intake sets
 * `gated: true` when the source matches, so a new Great UI component cannot
 * land in the public catalog by accident.
 */
export const GATED_SOURCES = ["Great UI"] as const;

/**
 * Where a component came from. Designers use this to judge fit, so it is a
 * structured record rather than a bare URL in a code comment.
 */
export const inspirationSchema = z.object({
	/** Library or site the design originated from, e.g. "Aceternity UI". */
	source: z.string().min(1).optional(),
	/** Canonical link to the original component or design. */
	url: z.string().url().optional(),
	/** Original author's name, when known. */
	author: z.string().min(1).optional(),
	/** Author's homepage, GitHub or social profile. */
	authorUrl: z.string().url().optional(),
	/** How closely this tracks the original. */
	relationship: z
		.enum(["port", "adaptation", "inspired-by", "original"])
		.default("inspired-by"),
	/** What we changed or added relative to the original. */
	note: z.string().optional(),
	license: z.string().optional(),
});

export type Inspiration = z.infer<typeof inspirationSchema>;

/** One documented prop, rendered as a row in the detail page props table. */
export const propDocSchema = z.object({
	name: z.string().min(1),
	type: z.string().min(1),
	/** Rendered verbatim in the table; omit for required props. */
	default: z.string().optional(),
	description: z.string().default(""),
	required: z.boolean().default(false),
});

export type PropDoc = z.infer<typeof propDocSchema>;

/**
 * Rendering hazards. Drives preview containment on the index page so one
 * heavy WebGL demo can't tank a grid of 40.
 */
export const riskSchema = z.object({
	/** Expensive to mount: WebGL, canvas loops, physics, large asset graphs. */
	heavy: z.boolean().default(false),
	/** Wants the whole viewport, or escapes its container with fixed/absolute. */
	fullscreen: z.boolean().default(false),
	/** Cannot be server-rendered. */
	clientOnly: z.boolean().default(false),
});

export type Risk = z.infer<typeof riskSchema>;

export const componentMetaSchema = z.object({
	/** Folder name. Kebab-case, stable, used in every URL and registry path. */
	slug: z
		.string()
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			"slug must be kebab-case (lowercase, digits, single hyphens)"
		),
	/** Display name, e.g. "Vinyl Album Card". */
	title: z.string().min(1),
	/** One sentence a designer can scan. Shown under the title. */
	description: z.string().default(""),
	/**
	 * Plain-English description of the motion or interaction, for designers
	 * who want to know what it *does* without reading the code.
	 */
	interaction: z.string().default(""),
	/** At least one; the first is treated as primary for grouping. */
	categories: z.array(z.enum(CATEGORIES)).min(1),
	/** Free-form search keywords. */
	tags: z.array(z.string()).default([]),
	inspiration: inspirationSchema.optional(),
	/** npm packages the component needs, passed through to the registry item. */
	dependencies: z.array(z.string()).default([]),
	/** Other components in this registry that must install alongside it. */
	registryDependencies: z.array(z.string()).default([]),
	props: z.array(propDocSchema).default([]),
	risk: riskSchema.default({}),
	/** Editorial quality score, 1-10. Drives default sort and "featured". */
	rating: z.number().int().min(1).max(10).default(5),
	/**
	 * `needs-review` means the metadata was backfilled mechanically and a
	 * human hasn't confirmed it. Surfaced in the UI so gaps are visible
	 * instead of silently wrong.
	 */
	status: z.enum(["stable", "needs-review", "draft"]).default("needs-review"),
	/** Hide from the catalog without deleting the component. */
	hidden: z.boolean().default(false),
	/**
	 * Password-gated. Omitted from the public catalog, `/r`, `/docs` and
	 * `llms.txt` so a restrictive license is not republished as a kit.
	 * Unlocked in the UI with `GATED_LIBRARY_PASSWORD`.
	 */
	gated: z.boolean().default(false),
	/** Free-form maintainer notes. Never rendered publicly. */
	notes: z.string().optional(),
});

export type ComponentMetaInput = z.input<typeof componentMetaSchema>;
export type ComponentMeta = z.output<typeof componentMetaSchema>;

/**
 * Validates at module load, so a malformed `meta.ts` fails the build and the
 * dev server rather than producing a half-broken catalog entry.
 */
export function defineComponent(meta: ComponentMetaInput): ComponentMeta {
	const result = componentMetaSchema.safeParse(meta);

	if (!result.success) {
		const issues = result.error.issues
			.map((issue) => `  ${issue.path.join(".") || "(root)"}: ${issue.message}`)
			.join("\n");
		throw new Error(
			`Invalid component metadata for "${meta.slug ?? "unknown"}":\n${issues}`
		);
	}

	return result.data;
}
