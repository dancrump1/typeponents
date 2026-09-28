/**
 * Extracts `*CmsMeta` from registry/cms/*.block.tsx source.
 * Keeps build-registry.js free of ts-morph for this small, stable shape.
 */

const CMS_META_PATTERN =
	/export\s+const\s+\w+CmsMeta\s*=\s*\{([\s\S]*?)\}\s*as\s+const/;

const FIELD_PATTERN =
	/\{\s*cmsField:\s*["']([^"']+)["']\s*,\s*prop:\s*["']([^"']+)["']\s*,\s*label:\s*["']([^"']+)["']([\s\S]*?)\}/g;

const extractCmsMetaFromSource = (source) => {
	const match = source.match(CMS_META_PATTERN);
	if (!match) return null;

	const block = match[1];
	const enabledMatch = block.match(/enabled:\s*(true|false)/);
	if (enabledMatch?.[1] === "false") return null;

	const usesBlockStylesMatch = block.match(/usesBlockStyles:\s*(true|false)/);
	const fields = [];
	let fieldMatch;

	while ((fieldMatch = FIELD_PATTERN.exec(block)) !== null) {
		const [, cmsField, prop, label, trailing] = fieldMatch;
		const field = { cmsField, prop, label };

		const editableMatch = trailing.match(/editable:\s*["']([^"']+)["']/);
		if (editableMatch) field.editable = editableMatch[1];

		const formatMatch = trailing.match(/format:\s*["']([^"']+)["']/);
		if (formatMatch) field.format = formatMatch[1];

		fields.push(field);
	}

	if (fields.length === 0) return null;

	return {
		usesBlockStyles: usesBlockStylesMatch?.[1] !== "false",
		fields,
	};
};

module.exports = { extractCmsMetaFromSource };
