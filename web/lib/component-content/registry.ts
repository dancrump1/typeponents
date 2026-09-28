import type { SharedBlockContent } from "./primitives";
import type {
	CarouselItem,
	ContentCollections,
	FaqItem,
	PricingCardItem,
	StepItem,
	StepPosition,
	TestimonialItem,
} from "./collections";
import type { ComponentContentShape } from "./primitives";

/**
 * Describes what content a component accepts: shared block fields plus
 * which collection shapes it uses, and any unique prop keys.
 */
export type ComponentContentProfile = {
	slug: string;
	title?: string;
	usesBlock: boolean;
	shapes: ComponentContentShape[];
	uniqueProps?: string[];
};

export type FallingTextContent = {
	text?: string;
	highlightWords?: string[];
};

export type TabbedFaqContent = {
	items?: FaqItem[];
};

export type SquishyPricingContent = {
	cards?: PricingCardItem[];
};

export type SimpleFooterContent = {
	brandName?: string;
	navigationLinks?: ContentCollections["navigationLinks"];
	socialLinks?: ContentCollections["socialLinks"];
};

export type HowItWorksContent = {
	features?: StepItem[];
	stepPositions?: StepPosition[];
};

export type OptionWheelContent = {
	items?: string[];
};

export type ParallaxCarouselContent = {
	items?: CarouselItem[];
};

export type LineSidebarContent = {
	items?: string[];
};

export type ScrollSplitCardContent = {
	imageSrc?: string;
	cards?: Array<{
		title: string;
		description: string;
		bgColor: string;
		textColor: string;
	}>;
};

export type TypewriterTestimonialsContent = {
	testimonials?: TestimonialItem[];
};

export type HeroParallaxContent = {
	products?: Array<{
		title: string;
		slug: string;
		image: { url: string };
	}>;
};

/** Per-component content interfaces. Extend as components migrate off hardcoded data. */
export interface ComponentContentRegistry {
	"falling-text": FallingTextContent;
	"tabbed-faq": TabbedFaqContent;
	"squishy-pricing": SquishyPricingContent;
	"simple-footer": SimpleFooterContent;
	"how-it-works": HowItWorksContent;
	"option-wheel": OptionWheelContent;
	"parallax-carousel": ParallaxCarouselContent;
	"line-sidebar": LineSidebarContent;
	"scroll-split-card": ScrollSplitCardContent;
	"typewriter-testimonials": TypewriterTestimonialsContent;
	"hero-parallax": HeroParallaxContent;
}

export type KnownComponentSlug = keyof ComponentContentRegistry;

export type ComponentContentFor<S extends KnownComponentSlug> =
	Partial<SharedBlockContent> &
		Partial<ContentCollections> &
		ComponentContentRegistry[S];

export type GenericComponentContent = Partial<SharedBlockContent> &
	Partial<ContentCollections> &
	Record<string, unknown>;

export type ComponentContentBySlug<S extends string> =
	S extends KnownComponentSlug ? ComponentContentFor<S> : GenericComponentContent;

export type WithComponentContent<S extends string = string> = Partial<
	ComponentContentBySlug<S>
>;
