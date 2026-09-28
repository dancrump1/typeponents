/**
 * Lands a component copied from another library in this repo's canonical shape.
 *
 * Two modes:
 *   (A) a shadcn registry item URL — fetched, unpacked and normalised whole.
 *   (B) a local file of pasted source — normalised, with attribution supplied
 *       on the command line.
 *
 * Writes:
 *   registry/components/<slug>/component.tsx   the component
 *   registry/components/<slug>/demo.tsx        the item's own example, or a scaffold
 *   registry/components/<slug>/meta.ts         metadata, pre-filled with attribution
 *   registry/components/<slug>/<file>.tsx      colocated files from the item
 *   hooks/<file>.ts, lib/<file>.ts             promoted files, never clobbering ours
 *
 * Nothing here is generated output: every file it writes is source a human is
 * expected to edit. It deliberately leaves prose metadata empty rather than
 * inventing it, and reports exactly which fields still need a human.
 *
 * Run: npx tsx scripts/v2/intake.mts <url-or-file> [options]
 */
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

import { CATEGORIES, GATED_SOURCES, type Category } from "../../registry/schema";
import {
	extractSpecifiers,
	isDeclarableDependency,
	packageName,
	rewriteSpecifiers,
	stripComments,
} from "./lib/imports.js";
import { describeSource } from "./libraries.js";

const root = process.cwd();
const COMPONENTS_DIR = path.join(root, "registry", "components");
const HOOKS_DIR = path.join(root, "hooks");
const LIB_DIR = path.join(root, "lib");

/**
 * Files that belong to the project, not to any component. A promoted `lib`
 * file from an external registry must never land on top of these even if the
 * exists-check is somehow bypassed.
 */
const PROTECTED = new Set([path.join(LIB_DIR, "utils.ts")]);

const RELATIONSHIPS = ["port", "adaptation", "inspired-by", "original"] as const;
type Relationship = (typeof RELATIONSHIPS)[number];

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

type Options = {
	target: string;
	slug?: string;
	categories: Category[];
	sourceUrl?: string;
	sourceName?: string;
	author?: string;
	relationship?: Relationship;
	force: boolean;
	dry: boolean;
};

const USAGE = `Usage: npx tsx scripts/v2/intake.mts <url-or-file> [options]

  <url-or-file>            shadcn registry item URL, or a path to pasted source

  --slug <slug>            override the derived kebab-case slug
  --category <name>        repeatable; must be one of registry/schema.ts CATEGORIES
  --source-url <url>       original component page (mode B; overrides in mode A)
  --source-name <name>     library name, when the host isn't in scripts/v2/libraries.js
  --author <name>          original author, for attribution
  --relationship <kind>    ${RELATIONSHIPS.join(" | ")}
  --force                  overwrite an existing registry/components/<slug>/
  --dry                    print the plan, write nothing`;

function fail(message: string): never {
	console.error(`intake: ${message}`);
	process.exit(1);
}

function parseArgs(argv: string[]): Options {
	const options: Options = { target: "", categories: [], force: false, dry: false };

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		const value = () => {
			const next = argv[++i];
			if (next === undefined || next.startsWith("--")) fail(`${arg} needs a value`);
			return next;
		};

		switch (arg) {
			case "--slug":
				options.slug = kebab(value());
				break;
			case "--category": {
				const category = value();
				if (!(CATEGORIES as readonly string[]).includes(category)) {
					fail(
						`unknown category "${category}". Valid categories:\n  ${CATEGORIES.join("\n  ")}`
					);
				}
				options.categories.push(category as Category);
				break;
			}
			case "--source-url":
				options.sourceUrl = value();
				break;
			case "--source-name":
				options.sourceName = value();
				break;
			case "--author":
				options.author = value();
				break;
			case "--relationship": {
				const relationship = value();
				if (!(RELATIONSHIPS as readonly string[]).includes(relationship)) {
					fail(`--relationship must be one of ${RELATIONSHIPS.join(", ")}`);
				}
				options.relationship = relationship as Relationship;
				break;
			}
			case "--force":
				options.force = true;
				break;
			case "--dry":
				options.dry = true;
				break;
			case "--help":
			case "-h":
				console.log(USAGE);
				process.exit(0);
			default:
				if (arg.startsWith("--")) fail(`unknown option ${arg}\n\n${USAGE}`);
				if (options.target) fail(`unexpected second target "${arg}"`);
				options.target = arg;
		}
	}

	if (!options.target) fail(`no target given\n\n${USAGE}`);
	return options;
}

// ---------------------------------------------------------------------------
// Naming
// ---------------------------------------------------------------------------

/** "VinylAlbumCard.tsx" -> "vinyl-album-card.tsx". Extensions survive. */
function kebab(value: string): string {
	return value
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.replace(/[^a-zA-Z0-9.-]/g, "-")
		.replace(/-{2,}/g, "-")
		.replace(/^-|-$/g, "")
		.toLowerCase();
}

const dropExt = (p: string) => p.replace(/\.[a-z0-9]+$/i, "");

function titleize(slug: string): string {
	return slug
		.split("-")
		.filter(Boolean)
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(" ");
}

// ---------------------------------------------------------------------------
// Registry item
// ---------------------------------------------------------------------------

const registryFileSchema = z.object({
	path: z.string().min(1),
	/** Absent in a few registries; `registry:ui` is the safe assumption. */
	type: z.string().default("registry:ui"),
	target: z.string().optional(),
	content: z.string().optional(),
});

const registryItemSchema = z.object({
	name: z.string().min(1),
	type: z.string().optional(),
	title: z.string().optional(),
	description: z.string().optional(),
	dependencies: z.array(z.string()).default([]),
	registryDependencies: z.array(z.string()).default([]),
	files: z.array(registryFileSchema).default([]),
});

type RegistryItem = z.output<typeof registryItemSchema>;
type RegistryFile = z.output<typeof registryFileSchema>;

function parseItem(body: string, origin: string): RegistryItem {
	let json: unknown;
	try {
		json = JSON.parse(body);
	} catch {
		// Registries that 404 to an HTML page are the usual cause.
		fail(`${origin} did not return JSON (got ${body.slice(0, 80).trim()}…)`);
	}

	const parsed = registryItemSchema.safeParse(json);
	if (!parsed.success) {
		fail(
			`${origin} is not a shadcn registry item:\n${parsed.error.issues
				.map((issue) => `    ${issue.path.join(".") || "(root)"}: ${issue.message}`)
				.join("\n")}`
		);
	}
	return parsed.data;
}

async function fetchItem(url: string): Promise<RegistryItem> {
	let body: string;
	try {
		const response = await fetch(url, { headers: { accept: "application/json" } });
		if (!response.ok) {
			fail(`${url} returned ${response.status} ${response.statusText}`);
		}
		body = await response.text();
	} catch (error) {
		// Sandboxed/offline runs are common; say so instead of dumping a stack.
		fail(
			`could not fetch ${url} — ${(error as Error).message}\n` +
				`  If the network is restricted, save the JSON by hand and run intake against\n` +
				`  that file with --source-url ${url}`
		);
	}

	return parseItem(body, url);
}

/**
 * Human docs page for a registry URL, per library. Libraries invent their own
 * routing, so anything unmapped keeps the registry URL — a stable canonical
 * link is better than a guessed 404.
 */
const DOCS_PATHS: Record<string, (name: string) => string> = {
	"great-ui.com": (name) => `/components/${name}`,
	"ui.aceternity.com": (name) => `/components/${name}`,
	"magicui.design": (name) => `/docs/components/${name}`,
	"cult-ui.com": (name) => `/docs/components/${name}`,
	"kokonutui.com": (name) => `/docs/components/${name}`,
	"ui.shadcn.com": (name) => `/docs/components/${name}`,
	"motion-primitives.com": (name) => `/docs/${name}`,
	"fancycomponents.dev": (name) => `/docs/components/${name}`,
	"stackbits.dev": (name) => `/docs/${name}`,
};

function docsUrl(registryUrl: string, name: string): string {
	try {
		const parsed = new URL(registryUrl);
		const host = parsed.hostname.replace(/^www\./, "");
		const toPath = DOCS_PATHS[host];
		return toPath ? new URL(toPath(name), parsed.origin).href : registryUrl;
	} catch {
		return registryUrl;
	}
}

// ---------------------------------------------------------------------------
// Import normalisation
// ---------------------------------------------------------------------------

/**
 * Specifier tails that mean "the `cn` helper", whatever the origin library
 * calls its lib folder. Matching the specifier shape rather than a resolved
 * file means pasted source normalises even when the helper isn't shipped in
 * `files[]`.
 */
const CN_TAILS = new Set([
	"cn",
	"utils",
	"lib/cn",
	"lib/utils",
	"libs/cn",
	"libs/utils",
	"utils/cn",
	"utils/utils",
	"helpers/cn",
	"common/cn",
	"lib/classnames",
	"lib/utils/cn",
]);

const ALIAS_RE = /^(?:@|~|#)\//;
const RELATIVE_RE = /^(?:\.{1,2}\/)+/;

/** The portion of a local specifier below any alias, relative prefix or `src/`. */
function specifierTail(spec: string): string | null {
	if (!ALIAS_RE.test(spec) && !RELATIVE_RE.test(spec)) return null;
	return spec
		.replace(ALIAS_RE, "")
		.replace(RELATIVE_RE, "")
		.replace(/^src\//, "")
		.replace(/^\/+/, "");
}

function isCnSpecifier(spec: string): boolean {
	const tail = specifierTail(spec);
	return tail !== null && CN_TAILS.has(tail.toLowerCase());
}

/**
 * Libraries that ship their own ThemeProvider read the active theme from it.
 * `next-themes` — which this repo already depends on — exposes the same
 * `useTheme()` shape, so the import can be redirected instead of hand-patched.
 */
const SHIMS: Array<[RegExp, string]> = [
	[/(?:^|\/)(?:theme-?provider|theme-?context|use-?theme)$/i, "next-themes"],
];

type Role = "component" | "demo" | "colocated" | "hook" | "lib";

type Placement = {
	/** Extension-less, lower-cased item path; the key import specifiers resolve to. */
	key: string;
	/** Basename without extension, lower-cased; the fallback match key. */
	base: string;
	source: RegistryFile;
	dest: string;
	role: Role;
	/** True when a file of the same name already exists and we leave it alone. */
	skipped: boolean;
};

const normalizeKey = (p: string) =>
	dropExt(p.replace(/\\/g, "/").replace(/^\.\//, "").replace(/^src\//, "")).toLowerCase();

/** Where a placement lives relative to the repo, for the report. */
const rel = (p: string) => path.relative(root, p).replace(/\\/g, "/");

type Resolver = {
	rewrite: (code: string, from: Placement) => string;
	/** Local specifiers we could not place, for the human to deal with. */
	unresolved: Set<string>;
	/** `@/components/ui/*` primitives the component expects. */
	primitives: Set<string>;
	rewrites: Map<string, string>;
	/** Bindings other than `cn` imported from a `cn` module, which won't exist here. */
	strandedBindings: Set<string>;
};

function createResolver(placements: Placement[], slug: string): Resolver {
	const byKey = new Map<string, Placement>();
	const byBase = new Map<string, Placement | null>();

	for (const placement of placements) {
		byKey.set(placement.key, placement);
		// External registries lay files out differently from their own aliases
		// (`registry/default/ui/x.tsx` imported as `@/components/ui/x`), so the
		// basename is the only reliable join — but only while it's unambiguous.
		byBase.set(placement.base, byBase.has(placement.base) ? null : placement);
	}

	const unresolved = new Set<string>();
	const primitives = new Set<string>();
	const rewrites = new Map<string, string>();
	const strandedBindings = new Set<string>();

	/** The specifier `from` should use to reach `to` after both have moved. */
	function specifierFor(to: Placement, from: Placement): string {
		const base = path.basename(to.dest).replace(/\.(tsx|ts|jsx|js)$/i, "");
		if (to.role === "hook") return `@/hooks/${base}`;
		if (to.role === "lib") return `@/lib/${base}`;
		const name = to.role === "component" ? "component" : base;
		return from.role === "hook" || from.role === "lib"
			? `@/registry/components/${slug}/${name}`
			: `./${name}`;
	}

	function find(spec: string, from: Placement): Placement | undefined {
		const tail = specifierTail(spec);
		if (tail === null) return undefined;

		if (RELATIVE_RE.test(spec)) {
			const resolved = path.posix.join(
				path.posix.dirname(from.source.path.replace(/\\/g, "/")),
				spec
			);
			const hit = byKey.get(normalizeKey(resolved));
			if (hit) return hit;
		} else {
			const hit = byKey.get(normalizeKey(tail));
			if (hit) return hit;
		}

		return byBase.get(normalizeKey(path.posix.basename(tail))) ?? undefined;
	}

	function rewrite(code: string, from: Placement): string {
		for (const spec of extractSpecifiers(code)) {
			if (!isCnSpecifier(spec)) continue;
			for (const binding of importedBindings(code, spec)) {
				if (binding !== "cn") strandedBindings.add(`${binding} (from "${spec}")`);
			}
		}

		return rewriteSpecifiers(code, (spec: string) => {
			if (isCnSpecifier(spec)) {
				return spec === "@/lib/utils" ? null : record(spec, "@/lib/utils");
			}

			const hit = find(spec, from);
			if (hit) {
				const next = specifierFor(hit, from);
				return next === spec ? null : record(spec, next);
			}

			const primitive = spec.match(/^@\/components\/ui\/([a-z0-9-]+)$/i)?.[1];
			if (primitive) {
				primitives.add(primitive);
				return null;
			}

			const shim = SHIMS.find(([re]) => re.test(spec));
			if (shim) return record(spec, shim[1]);

			// Local, but nothing in the item accounts for it: the origin library
			// reached into its own app code.
			if (specifierTail(spec) !== null) unresolved.add(spec);
			return null;
		});
	}

	function record(from: string, to: string): string {
		rewrites.set(from, to);
		return to;
	}

	return { rewrite, unresolved, primitives, rewrites, strandedBindings };
}

const IMPORT_CLAUSE_RE = /import\s+([\s\S]*?)\s+from\s*["']([^"']+)["']/g;

/** Names bound by `import … from "<spec>"`, used to spot non-`cn` helpers. */
function importedBindings(code: string, spec: string): string[] {
	const out: string[] = [];
	for (const match of stripComments(code).matchAll(IMPORT_CLAUSE_RE)) {
		if (match[2] !== spec) continue;
		const braces = match[1].match(/\{([\s\S]*)\}/);
		if (!braces) continue;
		for (const part of braces[1].split(",")) {
			const name = part.trim().split(/\s+as\s+/)[0].trim();
			if (name) out.push(name);
		}
	}
	return out;
}

// ---------------------------------------------------------------------------
// Planning
// ---------------------------------------------------------------------------

const UI_TYPES = new Set(["registry:ui", "registry:component"]);
const EXAMPLE_TYPES = new Set(["registry:example", "registry:block", "registry:page"]);
const DEMO_NAME_RE = /(demo|example|preview|usage)/i;

/** Ranks how likely a file is *the* component the item is named after. */
function componentScore(file: RegistryFile, slug: string): number {
	const base = kebab(dropExt(path.posix.basename(file.path)));
	if (!UI_TYPES.has(file.type)) return 0;
	if (base === slug) return 4;
	if (base.includes(slug) || slug.includes(base)) return 3;
	if (/^use-/.test(base) || base === "index") return 1;
	return 2;
}

function planPlacements(
	files: RegistryFile[],
	slug: string,
	dir: string
): { placements: Placement[]; component: Placement | null; demo: Placement | null } {
	const scored = files.map((file) => ({ file, score: componentScore(file, slug) }));
	const best = scored.reduce(
		(a, b) => (b.score > a.score ? b : a),
		{ file: undefined as RegistryFile | undefined, score: 0 }
	);

	// Some registries type every file `registry:example`; fall back to the only
	// .tsx file rather than refusing to import anything at all.
	const componentFile =
		best.file ??
		files.find((f) => /\.tsx$/i.test(f.path) && !DEMO_NAME_RE.test(f.path)) ??
		files.find((f) => /\.tsx$/i.test(f.path));

	const demoCandidates = files.filter(
		(f) => f !== componentFile && (EXAMPLE_TYPES.has(f.type) || DEMO_NAME_RE.test(f.path))
	);
	const demoFile =
		demoCandidates.find((f) => DEMO_NAME_RE.test(path.posix.basename(f.path))) ??
		(demoCandidates.length === 1 ? demoCandidates[0] : undefined);

	const placements: Placement[] = [];

	for (const file of files) {
		const basename = kebab(path.posix.basename(file.path.replace(/\\/g, "/")));
		const shared =
			file.type === "registry:hook"
				? HOOKS_DIR
				: file.type === "registry:lib"
					? LIB_DIR
					: null;

		let role: Role;
		let dest: string;

		if (file === componentFile) {
			role = "component";
			dest = path.join(dir, "component.tsx");
		} else if (file === demoFile) {
			role = "demo";
			dest = path.join(dir, "demo.tsx");
		} else if (shared) {
			role = shared === HOOKS_DIR ? "hook" : "lib";
			dest = path.join(shared, basename);
		} else {
			role = "colocated";
			dest = path.join(dir, basename);
		}

		placements.push({
			key: normalizeKey(file.path),
			base: normalizeKey(path.posix.basename(file.path)),
			source: file,
			dest,
			role,
			// A promoted hook/lib file is only ever additive: this repo's own
			// version of a helper always wins.
			skipped: Boolean(shared) && (fs.existsSync(dest) || PROTECTED.has(dest)),
		});
	}

	return {
		placements,
		component: placements.find((p) => p.role === "component") ?? null,
		demo: placements.find((p) => p.role === "demo") ?? null,
	};
}

// ---------------------------------------------------------------------------
// Demo scaffolding
// ---------------------------------------------------------------------------

/** The export a demo should render: default if there is one, else first named. */
function entryExport(code: string): { name: string; isDefault: boolean } {
	const clean = stripComments(code);

	const named = clean.match(
		/export\s+default\s+(?:async\s+)?(?:function|class)\s+([A-Z][A-Za-z0-9_]*)/
	);
	if (named) return { name: named[1], isDefault: true };
	if (/export\s+default\s+/.test(clean)) {
		const identifier = clean.match(/export\s+default\s+([A-Z][A-Za-z0-9_]*)\s*;?/);
		return { name: identifier?.[1] ?? "Component", isDefault: true };
	}

	const exported = clean.match(
		/export\s+(?:async\s+)?(?:function|const|class)\s+([A-Z][A-Za-z0-9_]*)/
	);
	return { name: exported?.[1] ?? "Component", isDefault: false };
}

function scaffoldDemo(componentCode: string): string {
	const entry = entryExport(componentCode);
	const importClause = entry.isDefault ? entry.name : `{ ${entry.name} }`;

	return `"use client";

import ${importClause} from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<${entry.name} />
		</div>
	);
}
`;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const ts = (value: unknown) => JSON.stringify(value);

type Attribution = {
	source?: string;
	url?: string;
	author?: string;
	authorUrl?: string;
	relationship: Relationship;
};

function buildAttribution(url: string | undefined, options: Options): Attribution | null {
	const described = url ? describeSource(url) : null;
	const source = options.sourceName ?? described?.source;
	const author = options.author ?? described?.author;

	if (!source && !url && !author) return null;

	return {
		source,
		url: url ?? undefined,
		author,
		authorUrl: described?.authorUrl,
		relationship: options.relationship ?? "port",
	};
}

/**
 * Detects the two risks that change how a preview must be contained. Both are
 * cheap to get wrong by hand and expensive on the index page.
 */
function inferRisk(code: string): { heavy: boolean; fullscreen: boolean } {
	return {
		// Matched on imports rather than bare words, so prose mentioning
		// "three" doesn't flag a plain CSS card as a WebGL scene.
		heavy:
			/from\s*["'](?:three(?:\/[^"']*)?|ogl|matter-js|phaser|postprocessing|@react-three\/[^"']+)["']/.test(
				code
			) || /\b(?:WebGLRenderer|ShaderMaterial|getContext\(\s*["']2d["'])/.test(code),
		fullscreen: /\b(?:h-screen|min-h-screen|100vh|fixed\s+inset-0)\b/.test(code),
	};
}

type MetaInput = {
	slug: string;
	title: string;
	description: string;
	categories: Category[];
	attribution: Attribution | null;
	dependencies: string[];
	registryDependencies: string[];
	risk: { heavy: boolean; fullscreen: boolean };
	status: "needs-review" | "draft";
	gated?: boolean;
	notes?: string;
};

function renderMeta(meta: MetaInput): string {
	const lines = [
		'import { defineComponent } from "@/registry/schema";',
		"",
		"export default defineComponent({",
		`\tslug: ${ts(meta.slug)},`,
		`\ttitle: ${ts(meta.title)},`,
		`\tdescription: ${ts(meta.description)},`,
		'\tinteraction: "",',
		`\tcategories: [${meta.categories.map(ts).join(", ")}],`,
		"\ttags: [],",
	];

	if (meta.attribution) {
		lines.push("\tinspiration: {");
		for (const [key, value] of Object.entries(meta.attribution)) {
			if (value) lines.push(`\t\t${key}: ${ts(value)},`);
		}
		lines.push("\t},");
	}

	lines.push(
		`\tdependencies: [${meta.dependencies.map(ts).join(", ")}],`,
		`\tregistryDependencies: [${meta.registryDependencies.map(ts).join(", ")}],`,
		"\tprops: [],",
		`\trisk: { heavy: ${meta.risk.heavy}, fullscreen: ${meta.risk.fullscreen}, clientOnly: false },`,
		"\trating: 5,",
		`\tstatus: ${ts(meta.status)},`
	);

	if (meta.gated) lines.push("\tgated: true,");
	if (meta.notes) lines.push(`\tnotes: ${ts(meta.notes)},`);
	lines.push("});", "");

	return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------

/** "motion@^12.0.0" -> "motion"; leaves scoped names alone. */
function bareDependency(dep: string): string {
	const at = dep.lastIndexOf("@");
	return at > 0 ? dep.slice(0, at) : dep;
}

function installedPackages(): Set<string> {
	const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
	return new Set([
		...Object.keys(pkg.dependencies ?? {}),
		...Object.keys(pkg.devDependencies ?? {}),
	]);
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const options = parseArgs(process.argv.slice(2));
const isUrl = /^https?:\/\//i.test(options.target);

function ensureFreeSlug(slug: string): void {
	if (fs.existsSync(path.join(COMPONENTS_DIR, slug)) && !options.force) {
		fail(`registry/components/${slug}/ already exists — pass --force to overwrite`);
	}
}

/** Checked before any fetch when the slug is already known, to fail fast. */
if (options.slug) ensureFreeSlug(options.slug);

/** Mode B pretends to be a one-file registry item so both modes share the rest. */
async function loadItem(): Promise<{
	item: RegistryItem;
	registryUrl: string | null;
	mode: string;
}> {
	if (isUrl) {
		return {
			item: await fetchItem(options.target),
			registryUrl: options.target,
			mode: "A (registry URL)",
		};
	}

	const file = path.resolve(root, options.target);
	if (!fs.existsSync(file)) fail(`no such file: ${options.target}`);

	// A saved registry item is still mode A in everything but transport, which
	// is the only way to run intake when the network is blocked.
	if (file.endsWith(".json")) {
		return {
			item: parseItem(fs.readFileSync(file, "utf8"), options.target),
			registryUrl: null,
			mode: "A (saved registry JSON)",
		};
	}

	return {
		mode: "B (local source)",
		item: {
			name: kebab(dropExt(path.basename(file))),
			title: undefined,
			description: undefined,
			dependencies: [],
			registryDependencies: [],
			files: [
				{
					path: path.basename(file),
					type: "registry:ui",
					content: fs.readFileSync(file, "utf8"),
				},
			],
		},
		registryUrl: null,
	};
}

const { item, registryUrl, mode } = await loadItem();

const slug = options.slug ?? kebab(item.name);
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
	fail(`derived slug "${slug}" is not kebab-case; pass --slug`);
}
ensureFreeSlug(slug);

const dir = path.join(COMPONENTS_DIR, slug);

const withContent = item.files.filter((file) => typeof file.content === "string");
if (!withContent.length) {
	fail(
		`${options.target} carries no file contents (only paths). ` +
			`Copy the source into a local file and run intake in mode B instead.`
	);
}
const contentless = item.files.length - withContent.length;

const { placements, component, demo } = planPlacements(withContent, slug, dir);
if (!component) fail(`could not identify a component file among ${item.files.length} file(s)`);

const resolver = createResolver(placements, slug);

type Write = { dest: string; content: string; note?: string };
const writes: Write[] = [];

for (const placement of placements) {
	if (placement.skipped) continue;
	writes.push({
		dest: placement.dest,
		content: resolver.rewrite(placement.source.content!, placement),
	});
}

const componentCode = writes.find((w) => w.dest === component.dest)!.content;

const scaffolded = !demo;
if (scaffolded) {
	writes.push({
		dest: path.join(dir, "demo.tsx"),
		content: scaffoldDemo(componentCode),
		note: "scaffold",
	});
}

const inferredDeps = new Set<string>();
for (const write of writes) {
	for (const spec of extractSpecifiers(write.content)) {
		if (isDeclarableDependency(spec)) inferredDeps.add(packageName(spec));
	}
}

const dependencies = [
	...new Set([...item.dependencies.map(bareDependency), ...inferredDeps]),
].sort();

const registryDependencies = [
	...new Set([...item.registryDependencies, ...resolver.primitives]),
].sort();

/**
 * `--source-url` wins, but a registry JSON link is not something a designer
 * can open, so either way the URL goes through the docs-path map.
 */
const sourceUrl = options.sourceUrl ?? registryUrl;
const attributionUrl =
	sourceUrl && /\.json(?:\?.*)?$/i.test(sourceUrl)
		? docsUrl(sourceUrl, item.name)
		: (sourceUrl ?? undefined);
const attribution = buildAttribution(attributionUrl, options);

const meta = renderMeta({
	slug,
	title: item.title || titleize(slug),
	description: item.description ?? "",
	categories: options.categories.length ? options.categories : ["Uncategorized"],
	attribution,
	dependencies,
	registryDependencies,
	risk: inferRisk(componentCode),
	status: scaffolded ? "draft" : "needs-review",
	gated: Boolean(
		attribution?.source &&
			(GATED_SOURCES as readonly string[]).includes(attribution.source)
	),
	notes: scaffolded
		? "demo.tsx is an intake scaffold — replace it with a real usage example."
		: undefined,
});

writes.push({ dest: path.join(dir, "meta.ts"), content: meta });

if (!options.dry) {
	for (const write of writes) {
		fs.mkdirSync(path.dirname(write.dest), { recursive: true });
		fs.writeFileSync(write.dest, write.content);
	}
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const installed = installedPackages();
const missing = dependencies.filter((dep) => !installed.has(dep));

console.log(`=== intake ${options.dry ? "(dry run) " : ""}===`);
console.log({
	mode,
	source: options.target,
	slug,
	folder: `registry/components/${slug}/`,
	filesInItem: item.files.length,
});

console.log("\nFiles:");
for (const write of writes) {
	const suffix = write.note ? `  (${write.note})` : "";
	console.log(`  ${options.dry ? "would write" : "wrote"} ${rel(write.dest)}${suffix}`);
}
for (const placement of placements.filter((p) => p.skipped)) {
	console.log(`  kept existing ${rel(placement.dest)} (item's copy discarded)`);
}
if (contentless) {
	console.log(`  ${contentless} file(s) in the item had no inline content and were ignored`);
}

console.log("\nImports rewritten:");
if (resolver.rewrites.size) {
	for (const [from, to] of resolver.rewrites) console.log(`  ${from}  ->  ${to}`);
} else {
	console.log("  none needed");
}

if (registryDependencies.length) {
	console.log("\nRegistry dependencies:");
	for (const dep of registryDependencies) {
		const local = /^https?:/.test(dep)
			? "external registry URL — resolve it by hand"
			: fs.existsSync(path.join(root, "components", "ui", `${dep}.tsx`))
				? "present in components/ui/"
				: "NOT in components/ui/ — run `npx shadcn@latest add " + dep + "`";
		console.log(`  ${dep}: ${local}`);
	}
}

console.log("\nnpm dependencies:");
if (dependencies.length) {
	for (const dep of dependencies) {
		console.log(`  ${dep}: ${installed.has(dep) ? "already in package.json" : "MISSING"}`);
	}
} else {
	console.log("  none");
}
if (missing.length) console.log(`\n  npm install ${missing.join(" ")}`);

if (resolver.unresolved.size) {
	console.log("\nImports that could not be resolved (fix by hand):");
	for (const spec of resolver.unresolved) console.log(`  ${spec}`);
}

if (resolver.strandedBindings.size) {
	console.log("\nImported from a `cn` module but not exported by @/lib/utils:");
	for (const binding of resolver.strandedBindings) console.log(`  ${binding}`);
}

console.log("\nTODO before this component is done:");
const todos = [
	`description: ${item.description ? "copied from the item — reword for our catalog" : "empty, write one sentence"}`,
	"interaction: empty, describe the motion in plain English for designers",
	options.categories.length
		? `categories: set to ${options.categories.join(", ")} — confirm`
		: 'categories: "Uncategorized" — pick at least one real category',
	"props: empty, run `npm run registry:enrich` to extract them, then edit descriptions",
	attribution?.source
		? `inspiration: ${attribution.source} — check the url and add the author if known`
		: "inspiration: NOT SET — designers need attribution, add source/url by hand",
];
if (scaffolded) {
	todos.push('demo.tsx: scaffold only — write a real example and flip status off "draft"');
}
for (const todo of todos) console.log(`  ${todo}`);

console.log(
	`\nThen: npm run registry:enrich && npm run registry:build${
		options.dry ? "\n(dry run — nothing was written)" : ""
	}`
);
