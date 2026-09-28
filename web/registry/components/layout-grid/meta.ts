import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "layout-grid",
	title: "Layout Grid",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: [],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/layout-grid",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "cards", type: "Card[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
