export { mapStandardContentToProps, resolveComponentProps } from "./resolve";
export {
	blockContentToProps,
	contentPatternSummary,
	getComponentContentProfile,
	resolveComponentContent,
	sharedContentDefaults,
} from "@/lib/component-content";
export { getComponentContentDefaults } from "@/data/component-content";
export type {
	ComponentContentBySlug,
	ComponentContentProfile,
	ComponentContentRegistry,
	ContentCollections,
	FaqItem,
	KnownComponentSlug,
	PricingCardItem,
	SharedBlockContent,
	WithComponentContent,
} from "@/lib/component-content";
export type {
	ComponentDefaultsFile,
	ComponentDefaultsManifest,
	ComponentDefaultsRecord,
	StandardContentProps,
} from "./types";
