import type {
	CarouselItem,
	FaqItem,
	NavItem,
	PricingCardItem,
	SocialLinkItem,
	StepItem,
	StepPosition,
	TestimonialItem,
	TextItem,
	TimelineEntry,
} from "../collections";
import type { ContentImage, ContentLink, SharedBlockContent } from "../primitives";

/**
 * Central default values for shared content shapes.
 * Components import these and merge with `resolveComponentContent()`.
 * Override per-slug in `data/component-content/{slug}.ts`.
 */

export const defaultSharedBlock: Required<
	Pick<SharedBlockContent, "title" | "headline" | "copy"> & {
		image: ContentImage;
		button: ContentLink;
	}
> = {
	title: "Section title",
	headline: "Supporting headline",
	copy: "Body copy goes here.",
	image: {
		url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop",
		alt: "Placeholder image",
	},
	button: {
		text: "Learn more",
		linkText: "Learn more",
		url: "#",
		linkUrl: "#",
		newWindow: false,
	},
};

export const defaultTextItem: TextItem = {
	id: "1",
	title: "Item title",
	description: "Item description",
};

export const defaultFaqItem: FaqItem = {
	id: "faq-1",
	category: "general",
	question: "Question?",
	answer: "Answer.",
};

export const defaultNavItem: NavItem = {
	label: "Link",
	href: "#",
};

export const defaultSocialLink: SocialLinkItem = {
	href: "#",
	icon: "Github",
	hoverColor: "text-foreground",
};

export const defaultPricingCard: PricingCardItem = {
	label: "Plan",
	monthlyPrice: "99",
	description: "Plan description",
	cta: "Sign up",
	background: "bg-indigo-500",
	backgroundVariant: "a",
};

export const defaultTestimonial: TestimonialItem = {
	name: "Customer name",
	text: "Testimonial quote.",
	jobtitle: "Role",
	image: "",
};

export const defaultStepItem: StepItem = {
	title: "Step title",
	description: "Step description",
	colorTheme: "blue",
};

export const defaultStepPosition: StepPosition = {
	className: "",
	rotate: "rotate-0",
};

export const defaultCarouselItem: CarouselItem = {
	id: 1,
	title: "Slide title",
	description: "Slide description",
	icon: "FiFileText",
};

export const defaultTimelineEntry: TimelineEntry = {
	title: "Event",
	decade: "2020s",
	copy: "Timeline copy",
	images: [],
};

export const sharedContentDefaults = {
	block: defaultSharedBlock,
	textItem: defaultTextItem,
	faqItem: defaultFaqItem,
	navItem: defaultNavItem,
	socialLink: defaultSocialLink,
	pricingCard: defaultPricingCard,
	testimonial: defaultTestimonial,
	stepItem: defaultStepItem,
	stepPosition: defaultStepPosition,
	carouselItem: defaultCarouselItem,
	timelineEntry: defaultTimelineEntry,
} as const;

export type SharedContentDefaults = typeof sharedContentDefaults;
