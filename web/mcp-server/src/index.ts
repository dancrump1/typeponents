#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { runShadcnAdd } from "./install.js";
import {
	fetchRegistryItem,
	installUrl,
	loadCatalog,
	pullFiles,
	REGISTRY_BASE,
	REGISTRY_ROOT,
	registrySource,
} from "./registry.js";

const server = new McpServer({
	name: "oss-registry",
	version: "0.2.0",
});

server.tool(
	"list_components",
	"List OSS registry components with optional filters. Use before installing.",
	{
		query: z.string().optional().describe("Search name, title, tags, category"),
		minRating: z
			.number()
			.min(0)
			.max(10)
			.optional()
			.describe("Minimum quality score 0-10"),
		includeHidden: z
			.boolean()
			.optional()
			.describe("Include components marked hidden"),
		limit: z.number().min(1).max(200).optional().default(50),
	},
	async ({ query, minRating = 0, includeHidden = false, limit = 50 }) => {
		let items = await loadCatalog("animated");
		if (!includeHidden) items = items.filter((i) => !i.hidden);
		if (minRating > 0) items = items.filter((i) => i.rating >= minRating);
		if (query?.trim()) {
			const q = query.toLowerCase();
			items = items.filter(
				(i) =>
					i.name.includes(q) ||
					i.title.toLowerCase().includes(q) ||
					i.tags.some((t) => t.toLowerCase().includes(q)) ||
					i.category.toLowerCase().includes(q)
			);
		}
		items = items
			.sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name))
			.slice(0, limit);

		return {
			content: [
				{
					type: "text",
					text: JSON.stringify(
						{
							source: registrySource(),
							registryRoot: REGISTRY_ROOT,
							registryBase: REGISTRY_BASE,
							count: items.length,
							items: items.map((i) => ({
								name: i.name,
								title: i.title,
								rating: i.rating,
								tags: i.tags,
								category: i.category,
								install: `npx shadcn@latest add ${installUrl(i.name, "r")}`,
							})),
						},
						null,
						2
					),
				},
			],
		};
	}
);

server.tool(
	"list_ui_components",
	"List static UI primitive components (buttons, cards, tables — no animations).",
	{
		query: z.string().optional(),
		minRating: z.number().min(0).max(10).optional(),
		includeHidden: z.boolean().optional(),
		limit: z.number().min(1).max(200).optional().default(50),
	},
	async ({ query, minRating = 0, includeHidden = false, limit = 50 }) => {
		let items = await loadCatalog("ui-basic");
		if (!includeHidden) items = items.filter((i) => !i.hidden);
		if (minRating > 0) items = items.filter((i) => i.rating >= minRating);
		if (query?.trim()) {
			const q = query.toLowerCase();
			items = items.filter(
				(i) =>
					i.name.includes(q) ||
					i.title.toLowerCase().includes(q) ||
					i.tags.some((t) => t.toLowerCase().includes(q))
			);
		}
		items = items.slice(0, limit);
		return {
			content: [
				{
					type: "text",
					text: JSON.stringify(
						{
							source: registrySource(),
							registry: `${REGISTRY_BASE}/r-ui`,
							count: items.length,
							items: items.map((i) => ({
								name: i.name,
								title: i.title,
								rating: i.rating,
								install: `npx shadcn@latest add ${installUrl(i.name, "r-ui")}`,
							})),
						},
						null,
						2
					),
				},
			],
		};
	}
);

server.tool(
	"get_component",
	"Fetch full registry JSON for an animated OSS component.",
	{
		name: z.string().describe("Component slug, e.g. 3d-card"),
	},
	async ({ name }) => {
		const item = await fetchRegistryItem(name, "r");
		return {
			content: [
				{
					type: "text",
					text: JSON.stringify(item, null, 2),
				},
			],
		};
	}
);

server.tool(
	"get_ui_component",
	"Fetch full registry JSON for a UI primitive from /r-ui/.",
	{
		name: z.string().describe("Component slug, e.g. comp-99 or button-group"),
	},
	async ({ name }) => {
		const item = await fetchRegistryItem(name, "r-ui");
		return {
			content: [{ type: "text", text: JSON.stringify(item, null, 2) }],
		};
	}
);

server.tool(
	"get_install_command",
	"Return the shadcn CLI command to add an animated OSS component.",
	{
		name: z.string().describe("Component slug"),
	},
	async ({ name }) => {
		const cmd = `npx shadcn@latest add ${installUrl(name, "r")}`;
		return {
			content: [{ type: "text", text: cmd }],
		};
	}
);

server.tool(
	"get_ui_install_command",
	"Return the shadcn CLI command to add a UI primitive.",
	{
		name: z.string().describe("Component slug"),
	},
	async ({ name }) => {
		const cmd = `npx shadcn@latest add ${installUrl(name, "r-ui")}`;
		return {
			content: [{ type: "text", text: cmd }],
		};
	}
);

server.tool(
	"pull_component",
	"Return installable file contents for an animated component. Use when shadcn CLI is unavailable or you need to inspect files first.",
	{
		name: z.string().describe("Component slug, e.g. 3d-card"),
	},
	async ({ name }) => {
		const item = await fetchRegistryItem(name, "r");
		const files = pullFiles(item);
		return {
			content: [
				{
					type: "text",
					text: JSON.stringify(
						{
							name: item.name,
							title: item.title,
							description: item.description,
							installCommand: `npx shadcn@latest add ${installUrl(name, "r")}`,
							files,
						},
						null,
						2
					),
				},
			],
		};
	}
);

server.tool(
	"pull_ui_component",
	"Return installable file contents for a UI primitive.",
	{
		name: z.string().describe("Component slug"),
	},
	async ({ name }) => {
		const item = await fetchRegistryItem(name, "r-ui");
		const files = pullFiles(item);
		return {
			content: [
				{
					type: "text",
					text: JSON.stringify(
						{
							name: item.name,
							title: item.title,
							description: item.description,
							installCommand: `npx shadcn@latest add ${installUrl(name, "r-ui")}`,
							files,
						},
						null,
						2
					),
				},
			],
		};
	}
);

server.tool(
	"install_component",
	"Install an animated OSS component into the current workspace using shadcn CLI. Requires components.json in the workspace.",
	{
		name: z.string().describe("Component slug, e.g. 3d-card"),
	},
	async ({ name }) => {
		const url = installUrl(name, "r");
		const result = runShadcnAdd(url);
		return {
			content: [
				{
					type: "text",
					text: JSON.stringify(
						{
							ok: result.ok,
							component: name,
							command: `npx shadcn@latest add ${url}`,
							cwd: process.cwd(),
							stdout: result.stdout,
							stderr: result.stderr,
							exitCode: result.exitCode,
						},
						null,
						2
					),
				},
			],
			isError: !result.ok,
		};
	}
);

server.tool(
	"install_ui_component",
	"Install a UI primitive into the current workspace using shadcn CLI.",
	{
		name: z.string().describe("Component slug"),
	},
	async ({ name }) => {
		const url = installUrl(name, "r-ui");
		const result = runShadcnAdd(url);
		return {
			content: [
				{
					type: "text",
					text: JSON.stringify(
						{
							ok: result.ok,
							component: name,
							command: `npx shadcn@latest add ${url}`,
							cwd: process.cwd(),
							stdout: result.stdout,
							stderr: result.stderr,
							exitCode: result.exitCode,
						},
						null,
						2
					),
				},
			],
			isError: !result.ok,
		};
	}
);

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
