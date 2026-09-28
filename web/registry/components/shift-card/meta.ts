import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "shift-card",
	title: "Shift Card",
	description: "",
	interaction: "",
	categories: ["Cards", "Grids & Layouts"],
	tags: ["hover"],
	inspiration: {
		source: "Cult UI",
		url: "https://www.cult-ui.com/docs/components/shift-card",
		authorUrl: "https://www.cult-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
