import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "animated-list",
	title: "Animated List",
	description:
		"Scrollable list of rows that appear as they come into view, with the top and bottom edges fading out.",
	interaction:
		"Rows grow and fade in as you scroll them into view and shrink back out as they leave; hovering or clicking a row selects it, and the arrow keys walk the selection up and down, scrolling it into view.",
	categories: ["Special Effects & FX"],
	tags: ["scroll-driven", "hover", "keyboard"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/components/animated-list",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "string[]", default: "[ \"Item 1\", \"Item 2\", \"Item 3\", \"Item…" },
		{ name: "onItemSelect", type: "((item: string, index: number) => void)" },
		{ name: "showGradients", type: "boolean", default: "true" },
		{ name: "enableArrowNavigation", type: "boolean", default: "true" },
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "itemClassName", type: "string", default: "\"\"" },
		{ name: "displayScrollbar", type: "boolean", default: "true" },
		{ name: "initialSelectedIndex", type: "number", default: "-1" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
