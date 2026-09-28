import fs from "fs";
import path from "path";

export type ComponentMeta = {
	rating: number;
	hidden: boolean;
	tags: string[];
	category: string;
	notes?: string;
	credit?: string;
};

export type CatalogEntry = {
	name: string;
	title: string;
	description: string;
	rating: number;
	hidden: boolean;
	tags: string[];
	/** First entry of `categories`, kept for existing consumers. */
	category: string;
	/** All categories the component belongs to, from data/categories.ts. */
	categories: string[];
	registry?: "animated" | "ui-basic" | "cms";
	registryUrl: string;
	/** Source the component was adapted from, parsed from its `// Credit:` comment. */
	credit?: string;
};

const DEFAULT_META: ComponentMeta = {
	rating: 5,
	hidden: false,
	tags: [],
	category: "",
};

export function getRegistryBaseUrl() {
	return (
		process.env.NEXT_PUBLIC_REGISTRY_URL ||
		process.env.REGISTRY_BASE_URL ||
		"https://components.drivedev.net"
	).replace(/\/$/, "");
}

export function loadComponentMeta(): Record<string, ComponentMeta> {
	const metaPath = path.join(process.cwd(), "data", "component-meta.json");
	if (!fs.existsSync(metaPath)) return {};
	return JSON.parse(fs.readFileSync(metaPath, "utf8"));
}

type RegistryIndexFile = {
	items?: CatalogEntry[];
};

function parseCatalogIndex(raw: CatalogEntry[] | RegistryIndexFile): CatalogEntry[] {
	if (Array.isArray(raw)) return raw;
	if (raw?.items && Array.isArray(raw.items)) return raw.items;
	return [];
}

function loadIndexFromPublicDir(subdir: "r" | "r-ui"): CatalogEntry[] {
	const indexPath = path.join(process.cwd(), "public", subdir, "index.json");
	if (fs.existsSync(indexPath)) {
		return parseCatalogIndex(
			JSON.parse(fs.readFileSync(indexPath, "utf8")) as
				| CatalogEntry[]
				| RegistryIndexFile
		);
	}

	// Fallback: legacy root-level index files
	const legacyPath = path.join(
		process.cwd(),
		"public",
		subdir === "r" ? "registry-index.json" : "registry-ui-index.json"
	);
	if (!fs.existsSync(legacyPath)) return [];
	return parseCatalogIndex(
		JSON.parse(fs.readFileSync(legacyPath, "utf8")) as
			| CatalogEntry[]
			| RegistryIndexFile
	);
}

export function loadCatalogIndex(): CatalogEntry[] {
	return loadIndexFromPublicDir("r");
}

export function loadUiBasicCatalogIndex(): CatalogEntry[] {
	return loadIndexFromPublicDir("r-ui");
}

export function mergeMeta(
	name: string,
	meta: Record<string, ComponentMeta>
): ComponentMeta {
	return { ...DEFAULT_META, ...meta[name] };
}

export function toTitleCase(str: string) {
	return str
		.replace(/[-_]/g, " ")
		.replace(/([A-Z])/g, " $1")
		.replace(/\s+/g, " ")
		.replace(/^./, (c) => c.toUpperCase())
		.trim();
}
