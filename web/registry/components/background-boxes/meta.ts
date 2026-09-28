import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "background-boxes",
	title: "Background Boxes",
	description: "Backdrop grid of empty cells with faint plus marks at the intersections.",
	interaction:
		"Hovering a cell floods it with a random pastel colour instantly, and it clears again as the pointer moves on to the next one.",
	categories: ["Backgrounds"],
	tags: ["hover"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "rowCount", type: "number", default: "15" },
		{ name: "columnCount", type: "number", default: "5" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
