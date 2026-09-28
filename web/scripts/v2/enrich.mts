/**
 * Mechanical metadata enrichment. Fills in what can be derived from the source
 * with certainty and leaves prose to humans/agents.
 *
 *  - props:  extracted from the component's props type via the TypeScript AST,
 *            including defaults from destructuring and JSDoc descriptions.
 *  - tags:   interaction signals detected in the source (hover, drag, scroll,
 *            webgl, …) so designers can filter by behaviour, not just shape.
 *
 * Only writes fields that are still empty, so it never clobbers hand-authored
 * metadata. Safe to re-run.
 *
 * `--retag` is the exception: it recomputes the signal tags instead of adding to
 * them, which is the only way to drop one a looser pattern got wrong. Tags
 * outside the signal vocabulary — `featured`, `internal` — are curation, not
 * derivation, and survive.
 *
 * Run: npx tsx scripts/v2/enrich.mts [--dry] [--retag]
 */
import fs from "node:fs";
import path from "node:path";
import { Project, SyntaxKind, type Node, type Type } from "ts-morph";

const DRY = process.argv.includes("--dry");
const RETAG = process.argv.includes("--retag");
const root = process.cwd();
const COMPONENTS_DIR = path.join(root, "registry", "components");

const slugs = fs
	.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
	.filter((e) => e.isDirectory())
	.map((e) => e.name)
	.filter((s) => fs.existsSync(path.join(COMPONENTS_DIR, s, "component.tsx")))
	.sort();

// ---------------------------------------------------------------------------
// Interaction signals
// ---------------------------------------------------------------------------

/**
 * Behaviour a designer can filter on. Ordered most- to least-specific so the
 * derived tag list reads sensibly.
 */
/**
 * Each pattern matches code structure — an import, a JSX tag, a call, an object
 * key — never a bare word. A component with a menu item labelled "Canvas" is
 * not a WebGL component, and matching `\bCanvas\b` said it was.
 */
const SIGNALS: Array<[string, RegExp]> = [
	[
		"webgl",
		/from\s*["'](?:three(?:\/[^"']*)?|ogl|postprocessing|@react-three\/[^"']+)["']|<Canvas[\s/>]|\b(?:useThree|WebGLRenderer|ShaderMaterial|createShader|gl_FragColor)\b/,
	],
	["canvas", /getContext\(\s*["']2d["']|<canvas[\s/>]/],
	["spring", /\b(?:useSpring|useSprings)\b|type:\s*["']spring["']|\b(?:stiffness|damping|mass):/],
	[
		"drag",
		/\b(?:onDrag(?:Start|End|Enter|Over|Leave)?|useDrag|dragConstraints|dragElastic|dragMomentum|whileDrag|onPointerDown|draggable)\b|\bdrag(?:=\{|\s*\/?>)/,
	],
	[
		"scroll-driven",
		/\b(?:useScroll|ScrollTrigger|onScroll|scrollYProgress|scrollXProgress|IntersectionObserver|useInView)\b/,
	],
	["hover", /\b(?:onMouseEnter|onMouseOver|onHoverStart|whileHover)\b|(?:group-)?hover:/],
	["cursor-tracking", /\b(?:onMouseMove|clientX|clientY|mousePosition|useMouse|useMousePosition)\b/],
	["keyboard", /\b(?:onKeyDown|onKeyUp|onKeyPress)\b|addEventListener\(\s*["']key/],
	["autoplay", /\b(?:setInterval|requestAnimationFrame|autoPlay|useAnimationFrame)\b/],
	// `dark:` is on almost every component and says nothing about behaviour;
	// this tag is for components that actually read the active theme.
	["theme-aware", /\b(?:useTheme|resolvedTheme)\b|from\s*["']next-themes["']/],
	["responsive", /\b(?:useWindowSize|matchMedia|ResizeObserver|useMediaQuery)\b/],
];

const SIGNAL_NAMES = new Set(SIGNALS.map(([name]) => name));

function detectSignals(code: string): string[] {
	return SIGNALS.filter(([, re]) => re.test(code)).map(([name]) => name);
}

// ---------------------------------------------------------------------------
// Props extraction
// ---------------------------------------------------------------------------

type Extracted = {
	name: string;
	type: string;
	default?: string;
	description: string;
	required: boolean;
};

const project = new Project({
	tsConfigFilePath: path.join(root, "tsconfig.json"),
	skipAddingFilesFromTsConfig: true,
	skipFileDependencyResolution: true,
});

/** Collapses a printed type to something readable in a table cell. */
function tidyType(text: string): string {
	let t = text
		.replace(/\s*\|\s*undefined\b/g, "")
		.replace(/\bimport\([^)]*\)\./g, "")
		.replace(/\s+/g, " ")
		.trim();
	if (t.length > 60) t = t.slice(0, 57) + "…";
	return t || "unknown";
}

/** The exported component declaration most likely to be the entry point. */
function findComponent(source: ReturnType<Project["addSourceFileAtPath"]>) {
	const exported = source.getExportedDeclarations();

	// A default export wins; otherwise the first exported function/const.
	const preferred =
		exported.get("default")?.[0] ??
		[...exported.entries()].map(([, decls]) => decls[0]).find(Boolean);

	return preferred ?? null;
}

/** Props type of a component declaration, if it has one. */
function propsTypeOf(decl: Node): Type | null {
	const fn =
		decl.asKind(SyntaxKind.FunctionDeclaration) ??
		decl.asKind(SyntaxKind.ArrowFunction) ??
		decl.asKind(SyntaxKind.FunctionExpression) ??
		decl
			.asKind(SyntaxKind.VariableDeclaration)
			?.getInitializerIfKind(SyntaxKind.ArrowFunction) ??
		decl
			.asKind(SyntaxKind.VariableDeclaration)
			?.getInitializerIfKind(SyntaxKind.FunctionExpression) ??
		null;

	if (!fn) return null;
	const param = fn.getParameters()[0];
	if (!param) return null;
	try {
		return param.getType();
	} catch {
		return null;
	}
}

/** Defaults written as destructuring in the parameter list. */
function destructuredDefaults(decl: Node): Map<string, string> {
	const out = new Map<string, string>();
	const fn =
		decl.asKind(SyntaxKind.FunctionDeclaration) ??
		decl.asKind(SyntaxKind.ArrowFunction) ??
		decl
			.asKind(SyntaxKind.VariableDeclaration)
			?.getInitializerIfKind(SyntaxKind.ArrowFunction) ??
		null;
	const param = fn?.getParameters()[0];
	const pattern = param?.getNameNode().asKind(SyntaxKind.ObjectBindingPattern);
	if (!pattern) return out;

	for (const element of pattern.getElements()) {
		const init = element.getInitializer();
		if (!init) continue;
		let text = init.getText().replace(/\s+/g, " ").trim();
		if (text.length > 40) text = text.slice(0, 37) + "…";
		out.set(element.getName(), text);
	}
	return out;
}

function extractProps(filePath: string): Extracted[] {
	let source;
	try {
		source = project.addSourceFileAtPath(filePath);
	} catch {
		return [];
	}

	const decl = findComponent(source);
	if (!decl) return [];

	const type = propsTypeOf(decl);
	if (!type) return [];

	const defaults = destructuredDefaults(decl);
	const out: Extracted[] = [];

	let properties;
	try {
		properties = type.getProperties();
	} catch {
		return [];
	}

	for (const prop of properties) {
		const name = prop.getName();
		if (name.startsWith("__") || name === "children") continue;
		// Skip the long tail of inherited DOM props; they aren't the component's API.
		const declNode = prop.getDeclarations()[0];
		if (!declNode) continue;
		const declFile = declNode.getSourceFile().getFilePath();
		if (declFile.includes("node_modules")) continue;

		let typeText = "unknown";
		try {
			typeText = tidyType(prop.getTypeAtLocation(declNode).getText(declNode));
		} catch {
			/* keep "unknown" */
		}

		const jsDoc =
			declNode
				.asKind(SyntaxKind.PropertySignature)
				?.getJsDocs()
				.map((d) => d.getCommentText() ?? "")
				.join(" ")
				.trim() ?? "";

		const optional = Boolean(
			declNode.asKind(SyntaxKind.PropertySignature)?.hasQuestionToken()
		);

		out.push({
			name,
			type: typeText,
			default: defaults.get(name),
			description: jsDoc,
			required: !optional && !defaults.has(name),
		});
	}

	source.forget();
	return out.sort((a, b) => Number(b.required) - Number(a.required));
}

// ---------------------------------------------------------------------------
// Patch meta.ts
// ---------------------------------------------------------------------------

const ts = (v: unknown) => JSON.stringify(v);

function renderProps(props: Extracted[]): string {
	if (!props.length) return "\tprops: [],";
	const lines = ["\tprops: ["];
	for (const p of props) {
		const bits = [`name: ${ts(p.name)}`, `type: ${ts(p.type)}`];
		if (p.default !== undefined) bits.push(`default: ${ts(p.default)}`);
		if (p.description) bits.push(`description: ${ts(p.description)}`);
		if (p.required) bits.push("required: true");
		lines.push(`\t\t{ ${bits.join(", ")} },`);
	}
	lines.push("\t],");
	return lines.join("\n");
}

/** Replaces `\tprops: [ … ],` including a multi-line body. */
function replacePropsBlock(src: string, replacement: string): string {
	const start = src.indexOf("\n\tprops: [");
	if (start === -1) return src;
	let i = src.indexOf("[", start);
	let depth = 0;
	for (; i < src.length; i++) {
		if (src[i] === "[") depth++;
		else if (src[i] === "]") {
			depth--;
			if (depth === 0) break;
		}
	}
	const end = src.indexOf("\n", i);
	return src.slice(0, start + 1) + replacement + src.slice(end);
}

function mergeTags(src: string, derived: string[]): string {
	const match = src.match(/\n\ttags: \[([^\]]*)\],/);
	if (!match) return src;
	const existing = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
	// On retag, keep curated tags in their original order and re-derive the rest.
	const next = RETAG
		? [...new Set([...existing.filter((t) => !SIGNAL_NAMES.has(t)), ...derived])]
		: [...new Set([...existing, ...derived])];
	if (next.length === existing.length && next.every((t, i) => t === existing[i])) {
		return src;
	}
	return src.replace(match[0], `\n\ttags: [${next.map(ts).join(", ")}],`);
}

let propsFilled = 0;
let tagsAdded = 0;
let totalProps = 0;
const failures: string[] = [];

for (const slug of slugs) {
	const dir = path.join(COMPONENTS_DIR, slug);
	const metaPath = path.join(dir, "meta.ts");
	const componentPath = path.join(dir, "component.tsx");

	let src = fs.readFileSync(metaPath, "utf8");
	const before = src;

	const hasProps = !/\n\tprops: \[\],/.test(src);

	if (!hasProps) {
		let props: Extracted[] = [];
		try {
			props = extractProps(componentPath);
		} catch (error) {
			failures.push(`${slug}: ${(error as Error).message}`);
		}
		if (props.length) {
			src = replacePropsBlock(src, renderProps(props));
			propsFilled++;
			totalProps += props.length;
		}
	}

	const code = fs.readFileSync(componentPath, "utf8");
	const signals = detectSignals(code);
	const withTags = mergeTags(src, signals);
	if (withTags !== src) tagsAdded++;
	src = withTags;

	if (src !== before && !DRY) fs.writeFileSync(metaPath, src);
}

console.log(`=== metadata enrichment ${DRY ? "(dry run)" : ""} ===`);
console.log({
	components: slugs.length,
	componentsWithPropsExtracted: propsFilled,
	totalPropsDocumented: totalProps,
	componentsWithSignalTags: tagsAdded,
	extractionFailures: failures.length,
});
if (failures.length) {
	console.log("\nFailures:");
	for (const f of failures.slice(0, 15)) console.log("  " + f);
}
