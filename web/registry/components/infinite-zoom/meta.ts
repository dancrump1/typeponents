import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "infinite-zoom",
	title: "Infinite Zoom",
	description: "",
	interaction: "",
	categories: ["Images"],
	tags: ["autoplay"],
	inspiration: {
		source: "Atelier UI",
		url: "https://www.atelier-ui.com/en/docs/components/scroll/infinite-zoom",
		authorUrl: "https://www.atelier-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "zoomAmount", type: "number", default: "5" },
		{ name: "lerpValue", type: "number", default: "0.08" },
		{ name: "className", type: "string" },
		{ name: "backgroundSpeed", type: "number", default: "0.2" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
