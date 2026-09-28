import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "floating-dock-menu",
	title: "Floating Dock Menu",
	description:
		"A pill-shaped dock that expands into a settings panel, with toggle rows and submenus per tab.",
	interaction:
		"Clicking a tab slides an indicator pill across and grows the dock upward into a panel of toggles. Clicking the active tab again collapses it back to the bar.",
	categories: ["Navigation"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/floating-dock-menu",
		author: "Great UI",
		authorUrl: "https://www.great-ui.com",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "tabs", type: "NavTabItem[]", default: "DEFAULT_TABS" },
		{ name: "defaultActiveIndex", type: "number | null", default: "null" },
		{ name: "menuWidth", type: "number", default: "310" },
		{ name: "showIcons", type: "boolean", default: "true" },
		{ name: "entryEase", type: "string | [number, number, number, number]" },
		{ name: "entryDuration", type: "number" },
		{ name: "exitEase", type: "string | [number, number, number, number]" },
		{ name: "exitDuration", type: "number" },
		{ name: "onTabChange", type: "((index: number | null) => void)" },
		{ name: "onItemToggle", type: "((tabId: string, itemId: string, enabled: boolean) => void)" },
		{ name: "className", type: "string" },
		{ name: "isFixed", type: "boolean", default: "true" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
