/**
 * Fills in missing `inspiration` blocks from URLs left in source comments.
 *
 * Attribution in this library was recorded inconsistently: some files use
 * `// Credit:` followed by a URL, many just have a bare `// https://…` comment.
 * This reads any commented URL that looks like a design source (asset CDNs and
 * spec links are excluded) and records it as structured attribution, which is
 * what the catalog and the detail page render.
 *
 * Never overwrites an existing `inspiration` block. Safe to re-run.
 *
 * Run: npx tsx scripts/v2/backfill-inspiration.mts [--dry]
 */
import fs from "node:fs";
import path from "node:path";

import { describeSource, isSourceUrl } from "./libraries.js";

const DRY = process.argv.includes("--dry");
const root = process.cwd();
const COMPONENTS_DIR = path.join(root, "registry", "components");

/** Lines that are unambiguously comments, so URLs in JSX or strings are ignored. */
const COMMENT_LINE = /^\s*(?:\/\/|\*|\/\*)/;

const URL_RE = /https?:\/\/[^\s)"'`,;]+/g;

/** First plausible design-source URL in the file's comments. */
function findSourceUrl(filePath: string): string | null {
	if (!fs.existsSync(filePath)) return null;

	const lines = fs.readFileSync(filePath, "utf8").split("\n");
	// Attribution is conventionally at the top of the file.
	for (const line of lines.slice(0, 60)) {
		if (!COMMENT_LINE.test(line)) continue;
		for (const match of line.matchAll(URL_RE)) {
			const url = match[0].replace(/[.,;]+$/, "");
			if (isSourceUrl(url)) return url;
		}
	}
	return null;
}

const ts = (v: unknown) => JSON.stringify(v);

const slugs = fs
	.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
	.filter((e) => e.isDirectory())
	.map((e) => e.name)
	.sort();

let filled = 0;
let alreadyHad = 0;
let noneFound = 0;
const bySource = new Map<string, number>();

for (const slug of slugs) {
	const dir = path.join(COMPONENTS_DIR, slug);
	const metaPath = path.join(dir, "meta.ts");
	if (!fs.existsSync(metaPath)) continue;

	const meta = fs.readFileSync(metaPath, "utf8");
	if (/\n\tinspiration: \{/.test(meta)) {
		alreadyHad++;
		continue;
	}

	// Look at the component first, then any colocated source files.
	const candidates = [
		path.join(dir, "component.tsx"),
		...fs
			.readdirSync(dir)
			.filter((f) => /\.tsx?$/.test(f) && !/^(meta|component|demo)/.test(f))
			.map((f) => path.join(dir, f)),
	];

	let url: string | null = null;
	for (const candidate of candidates) {
		url = findSourceUrl(candidate);
		if (url) break;
	}

	if (!url) {
		noneFound++;
		continue;
	}

	const described = describeSource(url);
	if (!described) {
		noneFound++;
		continue;
	}

	const lines = ["\tinspiration: {"];
	if (described.source) lines.push(`\t\tsource: ${ts(described.source)},`);
	if (described.url) lines.push(`\t\turl: ${ts(described.url)},`);
	if (described.author) lines.push(`\t\tauthor: ${ts(described.author)},`);
	if (described.authorUrl) lines.push(`\t\tauthorUrl: ${ts(described.authorUrl)},`);
	lines.push(`\t\trelationship: "adaptation",`);
	lines.push("\t},");

	// Slot it in where the migration would have written it.
	const anchor = "\n\tdependencies: [";
	const at = meta.indexOf(anchor);
	if (at === -1) {
		noneFound++;
		continue;
	}

	const next = meta.slice(0, at + 1) + lines.join("\n") + "\n" + meta.slice(at + 1);
	if (!DRY) fs.writeFileSync(metaPath, next);

	filled++;
	const key = described.source ?? "(unknown)";
	bySource.set(key, (bySource.get(key) ?? 0) + 1);
}

console.log(`=== inspiration backfill ${DRY ? "(dry run)" : ""} ===`);
console.log({
	components: slugs.length,
	alreadyAttributed: alreadyHad,
	newlyAttributed: filled,
	stillUnattributed: noneFound,
});
console.log("\nNewly attributed by source:");
for (const [source, count] of [...bySource.entries()].sort((a, b) => b[1] - a[1])) {
	console.log(`  ${String(count).padStart(3)}  ${source}`);
}
