export type {
	ContentCollectionKey,
	ContentIconRef,
	ContentImage,
	ContentLink,
	ComponentContentShape,
	SharedBlockContent,
	SharedBlockField,
} from "./primitives";

export type {
	CarouselItem,
	ContentCollectionItemMap,
	ContentCollections,
	FaqItem,
	NavItem,
	PricingCardItem,
	ProductItem,
	SocialLinkItem,
	StepItem,
	StepPosition,
	StringListItem,
	TestimonialItem,
	TextItem,
	TimelineEntry,
} from "./collections";

export type {
	ComponentContentBySlug,
	ComponentContentFor,
	ComponentContentProfile,
	ComponentContentRegistry,
	FallingTextContent,
	GenericComponentContent,
	HeroParallaxContent,
	HowItWorksContent,
	KnownComponentSlug,
	LineSidebarContent,
	OptionWheelContent,
	ParallaxCarouselContent,
	ScrollSplitCardContent,
	SimpleFooterContent,
	SquishyPricingContent,
	TabbedFaqContent,
	TypewriterTestimonialsContent,
	WithComponentContent,
} from "./registry";

export {
	contentPatternSummary,
	defaultCmsBlockProfile,
	getComponentContentProfile,
	migratedComponentProfiles,
	uniqueCmsMappings,
} from "./profiles";

export {
	blockContentToProps,
	resolveComponentContent,
} from "./resolve";

export {
	defaultCarouselItem,
	defaultFaqItem,
	defaultNavItem,
	defaultPricingCard,
	defaultSharedBlock,
	defaultSocialLink,
	defaultStepItem,
	defaultStepPosition,
	defaultTestimonial,
	defaultTextItem,
	defaultTimelineEntry,
	sharedContentDefaults,
	type SharedContentDefaults,
} from "./defaults/shared";
