import type { ContentIconRef, ContentImage } from "./primitives";

/**
 * Reusable collection item shapes. Components pick the shape that matches
 * their prop interface and extend with unique fields as needed.
 */

/** Generic title + description pair (carousels, feature lists, cards). */
export type TextItem = {
	id?: string | number;
	title: string;
	description?: string;
};

/** FAQ accordion/tab entry. */
export type FaqItem = {
	id: string;
	question: string;
	answer: string;
	category?: string;
};

/** Navigation link. */
export type NavItem = {
	label: string;
	href: string;
};

/** Footer / social link with serializable icon name. */
export type SocialLinkItem = {
	href: string;
	icon: ContentIconRef;
	hoverColor?: string;
};

/** Pricing / plan card. */
export type PricingCardItem = {
	label: string;
	monthlyPrice?: string;
	price?: string;
	description?: string;
	cta?: string;
	background?: string;
	backgroundVariant?: "a" | "b" | "c";
};

/** Testimonial quote. */
export type TestimonialItem = {
	name: string;
	text: string;
	jobtitle?: string;
	image?: string;
};

/** Product tile (e.g. hero-parallax). */
export type ProductItem = {
	title: string;
	slug?: string;
	image?: ContentImage | string;
};

/** Step / how-it-works feature. */
export type StepItem = {
	title: string;
	description: string;
	colorTheme?: "orange" | "blue" | "purple" | string;
	colors?: {
		bg: string;
		text: string;
		border: string;
	};
};

/** Layout position for stepped UIs. */
export type StepPosition = {
	className?: string;
	rotate?: string;
};

/** Timeline decade entry. */
export type TimelineEntry = {
	title: string;
	decade: string;
	copy?: string;
	images?: ContentImage[];
};

/** Carousel slide with optional icon ref. */
export type CarouselItem = TextItem & {
	id: number;
	icon?: ContentIconRef;
};

/** String list item (option-wheel, line-sidebar). */
export type StringListItem = string;

/** Maps collection keys to their primary item type. */
export type ContentCollectionItemMap = {
	items: TextItem | FaqItem | StringListItem;
	features: StepItem;
	cards: PricingCardItem | CarouselItem | TextItem;
	navItems: NavItem;
	navigationLinks: NavItem;
	socialLinks: SocialLinkItem;
	testimonials: TestimonialItem;
	products: ProductItem;
	pages: TextItem;
	data: TimelineEntry;
	images: ContentImage | string;
};

/** Array props keyed by collection name. */
export type ContentCollections = {
	items?: Array<
		ContentCollectionItemMap["items"] | TextItem | FaqItem | StringListItem
	>;
	features?: StepItem[];
	cards?: Array<PricingCardItem | CarouselItem | TextItem>;
	navItems?: NavItem[];
	navigationLinks?: NavItem[];
	socialLinks?: SocialLinkItem[];
	testimonials?: TestimonialItem[];
	products?: ProductItem[];
	pages?: TextItem[];
	data?: TimelineEntry[];
	images?: Array<ContentImage | string>;
	stepPositions?: StepPosition[];
};
