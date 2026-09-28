import type { ComponentContentBySlug } from "./registry";
import type { SharedBlockContent } from "./primitives";

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Merge external content over slug defaults and optional shared block defaults. */
export function resolveComponentContent<S extends string>(
	overrides: Partial<ComponentContentBySlug<S>> | undefined,
	slugDefaults: Partial<ComponentContentBySlug<S>> | undefined,
	sharedDefaults?: Partial<SharedBlockContent>
): ComponentContentBySlug<S> {
	const merged = {
		...(sharedDefaults ?? {}),
		...(slugDefaults ?? {}),
		...(overrides ?? {}),
	} as ComponentContentBySlug<S>;

	for (const key of Object.keys(overrides ?? {})) {
		const value = overrides?.[key as keyof typeof overrides];
		if (value === undefined) continue;
		const base = merged[key as keyof typeof merged];
		if (isPlainObject(base) && isPlainObject(value)) {
			merged[key as keyof typeof merged] = {
				...base,
				...value,
			} as ComponentContentBySlug<S>[keyof ComponentContentBySlug<S>];
		}
	}

	return merged;
}

export function blockContentToProps(block: Partial<SharedBlockContent>) {
	const props: Record<string, unknown> = {};

	if (block.title) props.title = block.title;
	if (block.headline) props.headline = block.headline;
	if (block.copy) props.copy = block.copy;
	if (block.image?.url) {
		props.imageSrc = block.image.url;
		props.image = block.image;
	}
	if (block.button) props.button = block.button;

	return props;
}
