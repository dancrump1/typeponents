import type { ComponentDefaultsRecord, StandardContentProps } from "./types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Deep-merge props: file defaults < registry overrides < passed props. */
export function resolveComponentProps<P extends ComponentDefaultsRecord>(
	props: Partial<P>,
	fileDefaults: Partial<P>,
	registryOverrides?: Partial<P> | null
): P {
	const merged = {
		...(fileDefaults ?? {}),
		...(registryOverrides ?? {}),
		...(props ?? {}),
	} as P;

	for (const key of Object.keys(props ?? {})) {
		const value = props[key as keyof P];
		if (value === undefined) continue;

		const base = merged[key as keyof P];
		if (isPlainObject(base) && isPlainObject(value)) {
			merged[key as keyof P] = {
				...base,
				...value,
			} as P[keyof P];
		}
	}

	return merged;
}

/** Map standard CMS / playground content onto component props using field mappings. */
export function mapStandardContentToProps(
	content: StandardContentProps,
	mappings?: Array<{
		cmsField: keyof StandardContentProps | string;
		prop: string;
		format?: "comma-list";
	}>
): ComponentDefaultsRecord {
	const props: ComponentDefaultsRecord = {};

	if (!mappings?.length) {
		if (content.title) props.title = content.title;
		if (content.headline) props.headline = content.headline;
		if (content.copy) props.copy = content.copy;
		if (content.imageUrl) props.imageSrc = content.imageUrl;
		if (content.buttonText) props.buttonText = content.buttonText;
		if (content.buttonUrl) props.buttonUrl = content.buttonUrl;
		return props;
	}

	for (const field of mappings) {
		const value = content[field.cmsField as keyof StandardContentProps];
		if (value == null || value === "") continue;

		if (field.format === "comma-list" && typeof value === "string") {
			props[field.prop] = value
				.split(/[,;]+/)
				.map((part) => part.trim())
				.filter(Boolean);
		} else {
			props[field.prop] = value;
		}
	}

	if (content.imageUrl && !props.imageSrc && !props.image && !props.src) {
		props.imageSrc = content.imageUrl;
	}

	return props;
}
