/**
 * Builds every artifact from the one source of truth: registry/components/<slug>/meta.ts.
 *
 * Nothing here is heuristic. A component exists because it has a folder with a
 * meta.ts; its files are whatever its imports actually reach.
 *
 * Emits:
 *   registry.json                        shadcn registry (source of `shadcn build`)
 *   public/r/<slug>.json                 install payload (public components)
 *   public/r/index.json                  catalog for external consumers
 *   public/docs/<slug>.md                agent-ready markdown ("Copy for agent")
 *   public/llms.txt                      agent entry point
 *   registry/__generated__/catalog.ts    typed catalog for the app (no source)
 *   registry/__generated__/demos.ts      static demo import map
 *   registry/__generated__/gated.ts      slugs that require the library password
 *   registry/__generated__/private/      install payloads for gated components
 *
 * Run: npx tsx scripts/v2/build.ts
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { componentMetaSchema, type ComponentMeta } from "../../registry/schema";
import {
	extractSpecifiers,
	resolveLocal,
	rewriteSpecifiers,
	isDeclarableDependency,
	packageName,
} from "./lib/imports.js";

const root = process.cwd();
const COMPONENTS_DIR = path.join(root, "registry", "components");
const GENERATED_DIR = path.join(root, "registry", "__generated__");

const config = {
	name: "DriveBrandStudio",
	homepage: "https://components.drivedev.net",
	baseUrl: "https://components.drivedev.net",
};

const aliasPaths: Record<string, string> = {
	"@/registry/components": COMPONENTS_DIR,
	"@/components/ui": path.join(root, "components", "ui"),
	"@/components": path.join(root, "components"),
	"@/hooks": path.join(root, "hooks"),
	"@/lib": path.join(root, "lib"),
	"@/data": path.join(root, "data"),
	"@/public": path.join(root, "public"),
};

const rel = (p: string) => path.relative(root, p).replace(/\\/g, "/");
const dropExt = (p: string) => p.replace(/\.(tsx|ts|jsx|js)$/i, "");

/** Files the consumer already has from `shadcn init` — never shipped. */
const CONSUMER_PROVIDED = new Set([path.join(root, "lib", "utils.ts")]);

// ---------------------------------------------------------------------------
// Load and validate metadata
// ---------------------------------------------------------------------------

const slugs = fs
	.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
	.filter((e) => e.isDirectory())
	.map((e) => e.name)
	.filter((slug) => fs.existsSync(path.join(COMPONENTS_DIR, slug, "meta.ts")))
	.sort();

type Loaded = {
	meta: ComponentMeta;
	dir: string;
	componentPath: string;
	demoPath: string | null;
};

const loaded: Loaded[] = [];
const errors: string[] = [];

for (const slug of slugs) {
	const dir = path.join(COMPONENTS_DIR, slug);
	const metaPath = path.join(dir, "meta.ts");
	try {
		const mod = await import(pathToFileURL(metaPath).href);
		const parsed = componentMetaSchema.safeParse(mod.default);
		if (!parsed.success) {
			errors.push(
				`${slug}/meta.ts invalid:\n${parsed.error.issues
					.map((i) => `    ${i.path.join(".") || "(root)"}: ${i.message}`)
					.join("\n")}`
			);
			continue;
		}
		if (parsed.data.slug !== slug) {
			errors.push(
				`${slug}/meta.ts declares slug "${parsed.data.slug}" but lives in folder "${slug}"`
			);
			continue;
		}
		const componentPath = path.join(dir, "component.tsx");
		if (!fs.existsSync(componentPath)) {
			errors.push(`${slug} has no component.tsx`);
			continue;
		}
		const demoPath = path.join(dir, "demo.tsx");
		loaded.push({
			meta: parsed.data,
			dir,
			componentPath,
			demoPath: fs.existsSync(demoPath) ? demoPath : null,
		});
	} catch (error) {
		errors.push(`${slug}/meta.ts failed to load: ${(error as Error).message}`);
	}
}

if (errors.length) {
	console.error(`\n${errors.length} metadata error(s):\n`);
	for (const e of errors) console.error("  " + e + "\n");
	process.exit(1);
}

const bySlug = new Map(loaded.map((l) => [l.meta.slug, l]));

// ---------------------------------------------------------------------------
// Walk each component's real file graph
// ---------------------------------------------------------------------------

type Graph = {
	/** Files owned by this component (inside its own folder). */
	own: string[];
	/** Promoted hooks/lib files this component needs shipped alongside. */
	shared: string[];
	/** npm packages, derived from imports rather than declared by hand. */
	npm: Set<string>;
	/** shadcn primitives, resolved by the consumer's own registry. */
	primitives: Set<string>;
	/** Other components in this registry. */
	components: Set<string>;
	/** Imports that reach app-level code and therefore can't be installed. */
	unshippable: Set<string>;
};

function walk(entry: string, dir: string): Graph {
	const own = new Set<string>();
	const shared = new Set<string>();
	const npm = new Set<string>();
	const primitives = new Set<string>();
	const components = new Set<string>();
	const unshippable = new Set<string>();

	const seen = new Set<string>();
	const queue = [entry];

	while (queue.length) {
		const file = queue.pop()!;
		if (seen.has(file)) continue;
		seen.add(file);

		const r = rel(file);
		if (r.startsWith(rel(dir) + "/")) own.add(file);
		else if (r.startsWith("hooks/") || (r.startsWith("lib/") && !CONSUMER_PROVIDED.has(file)))
			shared.add(file);

		if (/\.(css|json)$/i.test(file)) continue;

		for (const spec of extractSpecifiers(fs.readFileSync(file, "utf8"))) {
			if (spec === "@/lib/utils") continue; // from shadcn init

			const primitive = spec.match(/^@\/components\/ui\/([a-z0-9-]+)$/i)?.[1];
			if (primitive) {
				primitives.add(primitive);
				continue;
			}

			const crossComponent = spec.match(
				/^@\/registry\/components\/([a-z0-9-]+)\//
			)?.[1];
			if (crossComponent && crossComponent !== path.basename(dir)) {
				components.add(crossComponent);
				continue; // shipped by its own item
			}

			if (!spec.startsWith(".") && !spec.startsWith("@/")) {
				if (isDeclarableDependency(spec)) npm.add(packageName(spec));
				continue;
			}

			const resolved = resolveLocal(file, spec, aliasPaths);
			if (!resolved) {
				unshippable.add(spec);
				continue;
			}
			if (CONSUMER_PROVIDED.has(resolved)) continue;

			const rr = rel(resolved);
			if (
				rr.startsWith("components/") &&
				!rr.startsWith("components/ui/") // app code, not installable
			) {
				unshippable.add(spec);
				continue;
			}
			if (rr.startsWith("data/") || rr.startsWith("public/")) {
				unshippable.add(spec);
				continue;
			}

			queue.push(resolved);
		}
	}

	return {
		own: [...own].sort(),
		shared: [...shared].sort(),
		npm,
		primitives,
		components,
		unshippable,
	};
}

// ---------------------------------------------------------------------------
// Consumer path mapping
// ---------------------------------------------------------------------------

const graphs = new Map<string, Graph>();
for (const item of loaded) {
	graphs.set(item.meta.slug, walk(item.componentPath, item.dir));
}

/** True when the component ships as a single flat file. */
const isFlat = (slug: string) => (graphs.get(slug)?.own.length ?? 0) === 1;

/** Where a file lands in the consumer's project. */
function consumerPath(slug: string, file: string): string {
	const item = bySlug.get(slug)!;
	const r = rel(file);

	if (r.startsWith("hooks/") || r.startsWith("lib/")) return r;

	const inComponent = path.relative(item.dir, file).replace(/\\/g, "/");
	if (isFlat(slug)) return `components/ui/${slug}.tsx`;
	return `components/ui/${slug}/${inComponent}`;
}

/** The specifier a consumer uses to import a component. */
function consumerImport(slug: string): string {
	return isFlat(slug) ? `@/components/ui/${slug}` : `@/components/ui/${slug}/component`;
}

/** Rewrites dev-time specifiers to consumer-time specifiers. */
function toConsumerSource(slug: string, file: string): string {
	const raw = fs.readFileSync(file, "utf8");
	return rewriteSpecifiers(raw, (spec: string) => {
		const cross = spec.match(/^@\/registry\/components\/([a-z0-9-]+)\/(.+)$/);
		if (cross) {
			const [, otherSlug] = cross;
			if (otherSlug === slug) return null;
			return bySlug.has(otherSlug) ? consumerImport(otherSlug) : null;
		}
		return null;
	});
}

function fileType(file: string): string {
	const r = rel(file);
	if (r.startsWith("hooks/")) return "registry:hook";
	if (r.startsWith("lib/")) return "registry:lib";
	if (/\.css$/i.test(r)) return "registry:file";
	return "registry:ui";
}

// ---------------------------------------------------------------------------
// Build registry items
// ---------------------------------------------------------------------------

type RegistryFile = {
	path: string;
	type: string;
	target?: string;
	content?: string;
	localPath?: string;
};

type BuiltItem = {
	name: string;
	type: "registry:ui";
	title: string;
	description: string;
	dependencies: string[];
	registryDependencies: string[];
	files: RegistryFile[];
	meta: Record<string, unknown>;
};

const items: BuiltItem[] = [];
const warnings: string[] = [];

for (const item of loaded) {
	const slug = item.meta.slug;
	const graph = graphs.get(slug)!;

	const shippedFiles = [...graph.own, ...graph.shared];

	const files: RegistryFile[] = shippedFiles.map((file) => {
		const target = consumerPath(slug, file);
		const type = fileType(file);
		return {
			path: target,
			type,
			target,
			content: toConsumerSource(slug, file),
			/** Path in this repo, for the lean authoring manifest. */
			localPath: rel(file),
		};
	});

	// Declared deps win over inferred; inferred fills the gaps the old build left empty.
	const dependencies = [
		...new Set([...item.meta.dependencies, ...graph.npm]),
	].sort();

	const registryDependencies = [
		...new Set([
			...item.meta.registryDependencies,
			...graph.primitives,
			...[...graph.components].map((s) => `${config.baseUrl}/r/${s}.json`),
		]),
	].sort();

	if (graph.unshippable.size) {
		warnings.push(
			`${slug}: imports app-level code that consumers won't have — ${[
				...graph.unshippable,
			].join(", ")}`
		);
	}

	items.push({
		name: slug,
		type: "registry:ui",
		title: item.meta.title,
		description: item.meta.description || item.meta.title,
		dependencies,
		registryDependencies,
		files,
		meta: {
			categories: item.meta.categories,
			tags: item.meta.tags,
			interaction: item.meta.interaction,
			inspiration: item.meta.inspiration ?? null,
			props: item.meta.props,
			risk: item.meta.risk,
			rating: item.meta.rating,
			status: item.meta.status,
			hidden: item.meta.hidden,
			gated: item.meta.gated,
			importPath: consumerImport(slug),
		},
	});
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

const write = (abs: string, content: string) => {
	fs.mkdirSync(path.dirname(abs), { recursive: true });
	fs.writeFileSync(abs, content);
};

// 1. registry.json — lean authoring manifest: local paths, no inlined source.
//    Keeping source out of it means the file stays reviewable in a diff.
write(
	path.join(root, "registry.json"),
	JSON.stringify(
		{
			$schema: "https://ui.shadcn.com/schema/registry.json",
			name: config.name,
			homepage: config.homepage,
			items: items.map((item) => ({
				name: item.name,
				type: item.type,
				title: item.title,
				description: item.description,
				dependencies: item.dependencies,
				registryDependencies: item.registryDependencies,
				files: item.files.map((file) => ({
					path: file.localPath,
					type: file.type,
					target: file.target,
				})),
				meta: item.meta,
			})),
		},
		null,
		2
	) + "\n"
);

const PRIVATE_DIR = path.join(GENERATED_DIR, "private");
const unlinkIfExists = (abs: string) => {
	if (fs.existsSync(abs)) fs.unlinkSync(abs);
};

// 2. public/r/<slug>.json — the install payload, source inlined and imports
//    rewritten to consumer paths. Gated items go under __generated__/private
//    instead, so they are not fetchable without the unlock cookie.
for (const item of items) {
	const payload =
		JSON.stringify(
			{
				$schema: "https://ui.shadcn.com/schema/registry-item.json",
				...item,
				files: item.files.map(({ localPath, ...file }) => file),
			},
			null,
			2
		) + "\n";

	if (item.meta.gated) {
		write(path.join(PRIVATE_DIR, "r", `${item.name}.json`), payload);
		unlinkIfExists(path.join(root, "public", "r", `${item.name}.json`));
	} else {
		write(path.join(root, "public", "r", `${item.name}.json`), payload);
	}
}

// 3. public/r/index.json — external catalog (no source)
const catalog = items
	.filter((i) => !i.meta.hidden && !i.meta.gated)
	.map((i) => ({
		name: i.name,
		title: i.title,
		description: i.description,
		categories: i.meta.categories,
		tags: i.meta.tags,
		rating: i.meta.rating,
		status: i.meta.status,
		inspiration: i.meta.inspiration,
		dependencies: i.dependencies,
		install: `npx shadcn@latest add ${config.baseUrl}/r/${i.name}.json`,
		url: `${config.baseUrl}/r/${i.name}.json`,
		docs: `${config.baseUrl}/docs/${i.name}.md`,
	}));

write(
	path.join(root, "public", "r", "index.json"),
	JSON.stringify(
		{
			$schema: "https://ui.shadcn.com/schema/registry.json",
			name: config.name,
			homepage: config.homepage,
			items: catalog,
		},
		null,
		2
	) + "\n"
);

// 4. public/docs/<slug>.md — the "Copy for agent" payload
const PM_COMMANDS = (url: string) => [
	["pnpm", `pnpm dlx shadcn@latest add ${url}`],
	["npm", `npx shadcn@latest add ${url}`],
	["yarn", `yarn dlx shadcn@latest add ${url}`],
	["bun", `bunx shadcn@latest add ${url}`],
];

function renderDoc(item: BuiltItem, loadedItem: Loaded): string {
	const meta = loadedItem.meta;
	const url = `${config.baseUrl}/r/${item.name}.json`;
	const out: string[] = [];

	out.push(`# ${item.title}`, "");
	if (meta.description) out.push(meta.description, "");
	if (meta.interaction) out.push(`**Interaction.** ${meta.interaction}`, "");

	out.push(`- Categories: ${meta.categories.join(", ")}`);
	if (meta.tags.length) out.push(`- Tags: ${meta.tags.join(", ")}`);
	out.push(`- Import: \`${item.meta.importPath}\``);
	if (meta.inspiration?.url) {
		const src = meta.inspiration.source ?? meta.inspiration.url;
		out.push(
			`- Inspiration: ${src} (${meta.inspiration.relationship}) — ${meta.inspiration.url}`
		);
	}
	out.push("");

	if (meta.gated) {
		out.push("## Install", "");
		out.push(
			"This component is licensed for internal use only and is not published to the public registry. Copy the source from this page rather than running `shadcn add`.",
			""
		);
	} else {
		out.push("## Install", "");
		out.push("```bash", `npx shadcn@latest add ${url}`, "```", "");
		out.push(
			"This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.",
			""
		);
	}

	if (item.dependencies.length) {
		out.push("## Dependencies", "");
		for (const d of item.dependencies) out.push(`- \`${d}\``);
		out.push("");
	}

	if (item.registryDependencies.length) {
		out.push("## Registry dependencies", "");
		for (const d of item.registryDependencies) out.push(`- \`${d}\``);
		out.push("");
	}

	if (meta.props.length) {
		out.push("## Props", "");
		out.push("| Name | Type | Default | Description |");
		out.push("| --- | --- | --- | --- |");
		for (const p of meta.props) {
			out.push(
				`| \`${p.name}\`${p.required ? " *(required)*" : ""} | \`${p.type}\` | ${
					p.default ? `\`${p.default}\`` : "—"
				} | ${p.description || "—"} |`
			);
		}
		out.push("");
	}

	if (loadedItem.demoPath) {
		out.push("## Usage", "");
		out.push("```tsx", fs.readFileSync(loadedItem.demoPath, "utf8").trim(), "```", "");
	}

	out.push("## Source", "");
	for (const file of item.files) {
		out.push(`### \`${file.path}\``, "");
		const lang = /\.css$/i.test(file.path) ? "css" : "tsx";
		out.push("```" + lang, (file.content ?? "").trim(), "```", "");
	}

	if (meta.inspiration) {
		out.push("## Attribution", "");
		const bits: string[] = [];
		if (meta.inspiration.source) bits.push(`Source: ${meta.inspiration.source}`);
		if (meta.inspiration.author) bits.push(`Author: ${meta.inspiration.author}`);
		if (meta.inspiration.url) bits.push(`Original: ${meta.inspiration.url}`);
		out.push(bits.join(" · "), "");
		out.push(
			"Adapted from the original. Credit the original author when you ship this.",
			""
		);
	}

	return out.join("\n");
}

for (const item of items) {
	const loadedItem = bySlug.get(item.name)!;
	const doc = renderDoc(item, loadedItem);
	if (item.meta.gated) {
		write(path.join(PRIVATE_DIR, "docs", `${item.name}.md`), doc);
		unlinkIfExists(path.join(root, "public", "docs", `${item.name}.md`));
	} else {
		write(path.join(root, "public", "docs", `${item.name}.md`), doc);
	}
}

// 5. public/llms.txt — agent entry point
const llms: string[] = [];
llms.push(`# ${config.name} component registry`, "");
llms.push(
	`> ${catalog.length} React components for Tailwind CSS v4, distributed as a shadcn registry.`,
	""
);
llms.push(
	"Install any component with the shadcn CLI. It rewrites imports to match the target project's `components.json`, so `cn` resolves to whatever the project already uses:",
	""
);
llms.push("```bash", `npx shadcn@latest add ${config.baseUrl}/r/{name}.json`, "```", "");
llms.push(
	`Full markdown for one component (description, props, source, attribution): ${config.baseUrl}/docs/{name}.md`,
	""
);

const byCategory = new Map<string, typeof catalog>();
for (const c of catalog) {
	for (const cat of c.categories as string[]) {
		if (!byCategory.has(cat)) byCategory.set(cat, []);
		byCategory.get(cat)!.push(c);
	}
}
for (const cat of [...byCategory.keys()].sort()) {
	llms.push(`## ${cat}`, "");
	for (const c of byCategory.get(cat)!) {
		const desc = c.description && c.description !== c.title ? ` — ${c.description}` : "";
		llms.push(`- [${c.title}](${config.baseUrl}/docs/${c.name}.md)${desc}`);
	}
	llms.push("");
}
write(path.join(root, "public", "llms.txt"), llms.join("\n"));

// 6. registry/__generated__/catalog.ts — typed catalog for the app
const appCatalog = loaded
	.map((l) => ({
		slug: l.meta.slug,
		title: l.meta.title,
		description: l.meta.description,
		interaction: l.meta.interaction,
		categories: l.meta.categories,
		tags: l.meta.tags,
		inspiration: l.meta.inspiration ?? null,
		dependencies: items.find((i) => i.name === l.meta.slug)!.dependencies,
		registryDependencies: items.find((i) => i.name === l.meta.slug)!
			.registryDependencies,
		props: l.meta.props,
		risk: l.meta.risk,
		rating: l.meta.rating,
		status: l.meta.status,
		hidden: l.meta.hidden,
		gated: l.meta.gated,
		importPath: consumerImport(l.meta.slug),
		registryUrl: `${config.baseUrl}/r/${l.meta.slug}.json`,
		files: items.find((i) => i.name === l.meta.slug)!.files.map((f) => f.path),
	}))
	.sort((a, b) => a.slug.localeCompare(b.slug));

write(
	path.join(GENERATED_DIR, "catalog.ts"),
	`// Generated by scripts/v2/build.ts — do not edit.
import type { CatalogEntry } from "@/registry/types";

export const catalog: CatalogEntry[] = ${JSON.stringify(appCatalog, null, "\t")};

export const catalogBySlug = new Map(catalog.map((c) => [c.slug, c]));
`
);

const gated = loaded.filter((l) => l.meta.gated).map((l) => l.meta.slug);
write(
	path.join(GENERATED_DIR, "gated.ts"),
	`// Generated by scripts/v2/build.ts — do not edit.
export const gatedSlugs = ${JSON.stringify(gated, null, "\t")} as const;
`
);

// 7. registry/__generated__/demos.ts — static import map
const demoEntries = loaded
	.filter((l) => l.demoPath)
	.map(
		(l) =>
			`\t"${l.meta.slug}": () => import("@/registry/components/${l.meta.slug}/demo"),`
	)
	.join("\n");

write(
	path.join(GENERATED_DIR, "demos.ts"),
	`// Generated by scripts/v2/build.ts — do not edit.
import type { ComponentType } from "react";

type DemoLoader = () => Promise<{ default: ComponentType }>;

/**
 * Static import map. Literal specifiers let the bundler split each demo into
 * its own chunk, instead of the single giant chunk a dynamic
 * \`import("../usages/" + name)\` expression produced.
 */
export const demoLoaders: Record<string, DemoLoader> = {
${demoEntries}
};
`
);

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Dependency audit
// ---------------------------------------------------------------------------

/**
 * Every package a component imports must be declared in package.json.
 * Relying on a transitive dependency works until the direct dependency changes
 * its own deps, at which point components break with no local change.
 */
const pkg = JSON.parse(
	fs.readFileSync(path.join(root, "package.json"), "utf8")
) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> };

const declared = new Set([
	...Object.keys(pkg.dependencies ?? {}),
	...Object.keys(pkg.devDependencies ?? {}),
]);

const undeclared = new Map<string, string[]>();
for (const item of items) {
	for (const dep of item.dependencies) {
		if (declared.has(dep)) continue;
		if (!undeclared.has(dep)) undeclared.set(dep, []);
		undeclared.get(dep)!.push(item.name);
	}
}

const withDescription = loaded.filter((l) => l.meta.description).length;
const withInteraction = loaded.filter((l) => l.meta.interaction).length;
const withInspiration = loaded.filter((l) => l.meta.inspiration).length;
const withProps = loaded.filter((l) => l.meta.props.length).length;
const uncategorized = loaded.filter((l) =>
	l.meta.categories.includes("Uncategorized")
).length;
const withDeps = items.filter((i) => i.dependencies.length).length;
const cssFiles = items.flatMap((i) => i.files).filter((f) => /\.css$/i.test(f.path));

console.log("=== v2 registry build ===");
console.log({
	components: loaded.length,
	visible: catalog.length,
	hidden: loaded.filter((l) => l.meta.hidden).length,
	gated: gated.length,
	filesShipped: items.reduce((n, i) => n + i.files.length, 0),
	cssFilesShipped: cssFiles.length,
	itemsWithNpmDeps: withDeps,
});
console.log("\nMetadata coverage:");
console.log({
	description: `${withDescription}/${loaded.length}`,
	interaction: `${withInteraction}/${loaded.length}`,
	inspiration: `${withInspiration}/${loaded.length}`,
	props: `${withProps}/${loaded.length}`,
	uncategorized,
});

if (undeclared.size) {
	console.log(
		`\n${undeclared.size} package(s) imported by components but not in package.json:`
	);
	for (const [dep, users] of [...undeclared.entries()].sort(
		(a, b) => b[1].length - a[1].length
	)) {
		console.log(
			`  ${dep} — ${users.length} component(s), e.g. ${users.slice(0, 3).join(", ")}`
		);
	}
	console.log(
		`\n  Fix with: npm install ${[...undeclared.keys()].join(" ")}`
	);
}

if (warnings.length) {
	console.log(`\n${warnings.length} component(s) import app-level code:`);
	for (const w of warnings.slice(0, 20)) console.log("  " + w);
	if (warnings.length > 20) console.log(`  … and ${warnings.length - 20} more`);
}

console.log("\nWrote registry.json, public/r/, public/docs/, public/llms.txt, registry/__generated__/");
