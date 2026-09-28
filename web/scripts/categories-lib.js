const fs = require("fs");
const path = require("path");

const categoriesPath = path.join(process.cwd(), "data", "categories.ts");

/** Parse data/categories.ts into { [categoryName]: string[] }. */
function parseCategoriesFile(content) {
	const categories = {};
	const categoryStart =
		/^\s+(?:"([^"]+)"|([A-Za-z][\w-]*)):\s*\[(.*)$/;

	let current = null;

	for (const rawLine of content.replace(/\r\n/g, "\n").split("\n")) {
		const line = rawLine.replace(/\r$/, "");
		const startMatch = line.match(categoryStart);
		if (startMatch) {
			current = startMatch[1] || startMatch[2];
			categories[current] = [];
			const inline = startMatch[3].trim();
			if (inline && inline !== "]" && !inline.startsWith("]")) {
				for (const slug of extractSlugs(inline)) {
					categories[current].push(slug);
				}
			}
			if (inline.includes("]")) current = null;
			continue;
		}

		if (current) {
			for (const slug of extractSlugs(line)) {
				categories[current].push(slug);
			}
			if (line.includes("],") || line.trim() === "],") {
				current = null;
			}
		}
	}

	return categories;
}

function extractSlugs(text) {
	return [...text.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function loadCategories() {
	if (!fs.existsSync(categoriesPath)) {
		return { All: [] };
	}
	return parseCategoriesFile(fs.readFileSync(categoriesPath, "utf8"));
}

function formatCategoryKey(name) {
	return /^[A-Za-z][\w-]*$/.test(name) ? name : `"${name}"`;
}

/** Write categories object back to data/categories.ts. */
function writeCategories(categories) {
	const lines = ["export const categories = {"];

	const categoryNames = Object.keys(categories);
	for (let i = 0; i < categoryNames.length; i++) {
		const name = categoryNames[i];
		const slugs = [...new Set(categories[name].filter(Boolean))];
		const key = formatCategoryKey(name);

		lines.push(`    ${key}: [`);
		for (const slug of slugs) {
			lines.push(`        "${slug}",`);
		}
		lines.push(i < categoryNames.length - 1 ? "    ]," : "    ]");
		if (i < categoryNames.length - 1) lines.push("");
	}

	lines.push("};", "");
	fs.writeFileSync(categoriesPath, lines.join("\n"));
}

function getSubcategoryNames(categories) {
	return Object.keys(categories).filter((name) => name !== "All");
}

function getAllAssignedSlugs(categories) {
	const assigned = new Set();
	for (const [name, slugs] of Object.entries(categories)) {
		if (name === "All") continue;
		for (const slug of slugs) assigned.add(slug);
	}
	return assigned;
}

function normalizeCategories(categories, validSlugs) {
	const valid = new Set(validSlugs);
	const next = {};

	for (const [name, slugs] of Object.entries(categories)) {
		next[name] = slugs.filter((slug) => valid.has(slug));
	}

	if (!next.All) next.All = [];
	next.All = [...new Set([...next.All, ...validSlugs])].sort((a, b) =>
		a.localeCompare(b)
	);

	return next;
}

module.exports = {
	categoriesPath,
	parseCategoriesFile,
	loadCategories,
	writeCategories,
	getSubcategoryNames,
	getAllAssignedSlugs,
	normalizeCategories,
};
