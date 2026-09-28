/**
 * Legacy compatibility types. Prefer `@/lib/component-content` for new code.
 */

export type {
	SharedBlockContent,
	WithComponentContent,
} from "@/lib/component-content";

/** Serializable default props for a registry component (CMS / playground / usages). */
export type ComponentDefaultsRecord = Record<string, unknown>;

export type ComponentDefaultsFile = {
	slug: string;
	version: number;
	props: ComponentDefaultsRecord;
	cms?: {
		title?: string;
		headline?: string;
		copy?: string;
		imageUrl?: string;
		imageAlt?: string;
		buttonText?: string;
		buttonUrl?: string;
	};
};

export type ComponentDefaultsManifest = {
	generatedAt: string;
	componentCount: number;
	components: Array<{
		slug: string;
		propKeys: string[];
		hasCmsFallback: boolean;
	}>;
};

/** @deprecated Use SharedBlockContent from @/lib/component-content */
export type StandardContentProps = {
	title?: string;
	headline?: string;
	copy?: string;
	imageUrl?: string;
	imageAlt?: string;
	buttonText?: string;
	buttonUrl?: string;
};
