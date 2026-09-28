/**
 * Atomic content primitives shared across registry components, CMS blocks,
 * playground instances, and Craft CMS field mappings.
 */

/** Image asset reference (maps to CmsBlockData.hero[0] and Craft asset fields). */
export type ContentImage = {
	url: string;
	alt?: string | null;
	width?: number | null;
	height?: number | null;
};

/** Call-to-action link (maps to CmsBlockData.button[0] and Craft Link fields). */
export type ContentLink = {
	text?: string | null;
	linkText?: string | null;
	url?: string | null;
	linkUrl?: string | null;
	newWindow?: boolean | string | null;
};

/**
 * Standard block-level copy + media used by ~99% of CMS-wrapped components.
 * Aligns with `CmsBlockData` in registry/cms/_types.ts.
 */
export type SharedBlockContent = {
	title?: string;
	headline?: string;
	copy?: string;
	image?: ContentImage;
	button?: ContentLink;
};

/** CMS field handles on SharedBlockContent (for mappings and editors). */
export type SharedBlockField = keyof SharedBlockContent;

/** Serializable icon reference in defaults JSON (hydrated to JSX at render time). */
export type ContentIconRef = string;

/**
 * Collection prop names used across open-source components.
 * Most components use one or more of these in addition to SharedBlockContent.
 */
export type ContentCollectionKey =
	| "items"
	| "features"
	| "cards"
	| "navItems"
	| "navigationLinks"
	| "socialLinks"
	| "testimonials"
	| "products"
	| "pages"
	| "data"
	| "images";

/** Which shared shapes a component consumes (for docs, codegen, and CMS setup). */
export type ComponentContentShape =
	| "block"
	| "items"
	| "features"
	| "cards"
	| "nav"
	| "social"
	| "testimonials"
	| "products"
	| "pages"
	| "timeline"
	| "pricing"
	| "faq";
