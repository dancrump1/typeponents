import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fuzzy-overlay",
	title: "Fuzzy Overlay",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: [],
	inspiration: {
		source: "Hover.dev",
		url: "https://www.hover.dev/black-noise.png",
		authorUrl: "https://www.hover.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
