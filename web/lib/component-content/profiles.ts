import type { ComponentContentProfile } from "./registry";

/**
 * Catalog of what each component shares vs what is unique.
 * Generated from CMS block meta — run `npm run content:profiles` to refresh.
 */

export const defaultCmsBlockProfile: Omit<
	ComponentContentProfile,
	"slug" | "title"
> = {
	usesBlock: true,
	shapes: ["block"],
	uniqueProps: [],
};

export const uniqueCmsMappings: Record<
	string,
	Pick<ComponentContentProfile, "uniqueProps" | "shapes">
> = {
	"falling-text": {
		shapes: ["block"],
		uniqueProps: ["text", "highlightWords"],
	},
};

export const migratedComponentProfiles: ComponentContentProfile[] = [
	{
		slug: "falling-text",
		title: "Falling text",
		usesBlock: true,
		shapes: ["block"],
		uniqueProps: ["text", "highlightWords"],
	},
	{
		slug: "tabbed-faq",
		title: "Tabbed FAQ",
		usesBlock: false,
		shapes: ["faq"],
		uniqueProps: ["items"],
	},
	{
		slug: "squishy-pricing",
		title: "Squishy pricing",
		usesBlock: false,
		shapes: ["pricing", "cards"],
		uniqueProps: ["cards"],
	},
	{
		slug: "simple-footer",
		title: "Simple footer",
		usesBlock: false,
		shapes: ["nav", "social"],
		uniqueProps: ["brandName", "navigationLinks", "socialLinks"],
	},
	{
		slug: "how-it-works",
		title: "How it works",
		usesBlock: false,
		shapes: ["features"],
		uniqueProps: ["features", "stepPositions"],
	},
	{
		slug: "option-wheel",
		title: "Option wheel",
		usesBlock: false,
		shapes: ["items"],
		uniqueProps: ["items"],
	},
	{
		slug: "parallax-carousel",
		title: "Parallax carousel",
		usesBlock: false,
		shapes: ["items", "cards"],
		uniqueProps: ["items"],
	},
	{
		slug: "line-sidebar",
		title: "Line sidebar",
		usesBlock: false,
		shapes: ["items"],
		uniqueProps: ["items"],
	},
	{
		slug: "scroll-split-card",
		title: "Scroll split card",
		usesBlock: true,
		shapes: ["block", "cards"],
		uniqueProps: ["imageSrc", "cards"],
	},
	{
		slug: "hero-parallax",
		title: "Hero parallax",
		usesBlock: false,
		shapes: ["products"],
		uniqueProps: ["products"],
	},
	{
		slug: "typewriter-testimonials",
		title: "Typewriter testimonials",
		usesBlock: false,
		shapes: ["testimonials"],
		uniqueProps: ["testimonials"],
	},
];

export function getComponentContentProfile(
	slug: string
): ComponentContentProfile {
	const migrated = migratedComponentProfiles.find((p) => p.slug === slug);
	if (migrated) return migrated;

	const unique = uniqueCmsMappings[slug];
	if (unique) {
		return { slug, ...defaultCmsBlockProfile, ...unique };
	}

	return { slug, ...defaultCmsBlockProfile };
}

export const contentPatternSummary = {
	shared: {
		blockFields: ["title", "headline", "copy", "image", "button"] as const,
		cmsFieldCoverage: "~99% of CMS blocks (396 components)",
		description:
			"Standard marketing block copy and media. Maps to Craft blockTitle, blockHeadline, blockCopy, blockHero, blockButton.",
	},
	collections: {
		items: "Generic lists, FAQ entries, or string labels",
		features: "Step/how-it-works feature lists",
		cards: "Pricing cards, carousel slides, card grids",
		navItems: "Primary navigation links",
		navigationLinks: "Footer/header nav links",
		socialLinks: "Social icon links (icon as string ref)",
		testimonials: "Quote + author + role",
		products: "Product/parallax tiles",
		pages: "Multi-page transition content",
		data: "Timeline entries and structured records",
		images: "Gallery/image lists",
		stepPositions: "Layout positions for step UIs",
	},
	uniqueExamples: [
		"falling-text: text, highlightWords (from title/headline via comma-list)",
		"scroll-split-card: imageSrc, cards[] with bgColor/textColor",
		"simple-footer: brandName + nav + social",
	],
} as const;
