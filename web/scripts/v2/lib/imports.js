/**
 * Shared import parsing/resolution used by the migration and the registry
 * build. Comments are stripped before parsing so commented-out imports don't
 * become phantom dependencies.
 */
const fs = require("fs");
const path = require("path");

/**
 * Removes line and block comments while preserving string literals, so that
 * `// import x from "y"` is not mistaken for a real import.
 */
function stripComments(code) {
	let out = "";
	let i = 0;
	const n = code.length;
	let state = "code"; // code | line | block | single | double | template | regex

	while (i < n) {
		const c = code[i];
		const next = code[i + 1];

		if (state === "code") {
			if (c === "/" && next === "/") {
				state = "line";
				i += 2;
				continue;
			}
			if (c === "/" && next === "*") {
				state = "block";
				i += 2;
				continue;
			}
			if (c === "'") state = "single";
			else if (c === '"') state = "double";
			else if (c === "`") state = "template";
			out += c;
			i++;
			continue;
		}

		if (state === "line") {
			if (c === "\n") {
				state = "code";
				out += c;
			}
			i++;
			continue;
		}

		if (state === "block") {
			if (c === "*" && next === "/") {
				state = "code";
				i += 2;
			} else {
				// Preserve newlines so reported line numbers stay meaningful.
				if (c === "\n") out += c;
				i++;
			}
			continue;
		}

		// Inside a string/template literal.
		if (c === "\\") {
			out += c + (next ?? "");
			i += 2;
			continue;
		}
		if (
			(state === "single" && c === "'") ||
			(state === "double" && c === '"') ||
			(state === "template" && c === "`")
		) {
			state = "code";
		}
		out += c;
		i++;
	}

	return out;
}

const IMPORT_RE =
	/(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']|require\s*\(\s*["']([^"']+)["']\s*\)|import\s*\(\s*["']([^"']+)["']\s*\)/g;

/**
 * Web Worker and asset references, e.g.
 * `new Worker(new URL("./thing-worker.ts", import.meta.url))`.
 * These are real file dependencies that bundlers resolve, so they must be
 * treated as imports or the worker file gets left behind.
 */
const URL_ASSET_RE =
	/new\s+URL\s*\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/g;

/** All module specifiers in a file, ignoring anything inside comments. */
function extractSpecifiers(code) {
	const clean = stripComments(code);
	const out = [];
	for (const m of clean.matchAll(IMPORT_RE)) {
		const spec = m[1] || m[2] || m[3];
		if (spec) out.push(spec);
	}
	for (const m of clean.matchAll(URL_ASSET_RE)) {
		if (m[1]) out.push(m[1]);
	}
	return [...new Set(out)];
}

const CSS_RE = /\.(css|scss|sass)$/;

/**
 * Resolves a specifier to a file on disk, or null when it is an npm package.
 * Unlike the old resolver this never appends an extension to a specifier that
 * already carries one — the bug that kept every .css file out of the registry.
 */
function resolveLocal(fromFile, spec, aliasPaths) {
	let base;

	if (spec.startsWith(".")) {
		base = path.resolve(path.dirname(fromFile), spec);
	} else {
		const alias = Object.keys(aliasPaths)
			.sort((a, b) => b.length - a.length)
			.find((a) => spec === a || spec.startsWith(a + "/"));
		if (!alias) return null;
		base = path.join(
			aliasPaths[alias],
			spec.slice(alias.length).replace(/^\/+/, "")
		);
	}

	const hasExtension = /\.[a-z0-9]+$/i.test(path.basename(base));
	const candidates = CSS_RE.test(base)
		? [base]
		: hasExtension
			? [base, `${base}.tsx`, `${base}.ts`]
			: [
					`${base}.tsx`,
					`${base}.ts`,
					`${base}.jsx`,
					`${base}.js`,
					`${base}.json`,
					path.join(base, "index.tsx"),
					path.join(base, "index.ts"),
					base,
				];

	return (
		candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) || null
	);
}

const NODE_BUILTINS = new Set(["react", "react-dom"]);

/** npm package name from a specifier: "three/addons/x" -> "three". */
function packageName(spec) {
	if (spec.startsWith("@")) return spec.split("/").slice(0, 2).join("/");
	return spec.split("/")[0];
}

/**
 * True for specifiers that resolve to an npm package we should declare.
 * `react`/`react-dom` are peer-provided by every consumer, and `next` is
 * assumed by any shadcn-style project.
 */
function isDeclarableDependency(spec) {
	if (spec.startsWith(".") || spec.startsWith("@/")) return false;
	if (spec.startsWith("node:")) return false;
	const pkg = packageName(spec);
	return !NODE_BUILTINS.has(pkg) && pkg !== "next";
}

/** Rewrites every module specifier in `code` through `mapSpecifier`. */
function rewriteSpecifiers(code, mapSpecifier) {
	// Operates on the raw source (comments intact) but only substitutes
	// specifiers that the caller recognises, so comments are left alone.
	return code.replace(
		/(from\s*|import\s*\(\s*|require\s*\(\s*)(["'])([^"']+)\2/g,
		(match, prefix, quote, spec) => {
			const next = mapSpecifier(spec);
			return next && next !== spec ? `${prefix}${quote}${next}${quote}` : match;
		}
	);
}

module.exports = {
	stripComments,
	extractSpecifiers,
	resolveLocal,
	packageName,
	isDeclarableDependency,
	rewriteSpecifiers,
};
