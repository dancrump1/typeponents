import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "circle-accordion",
	title: "Circle Accordion",
	description: "",
	interaction: "",
	categories: ["Accordions"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "ZenUI",
		url: "https://zenui.net/animations/animated-accordion",
		authorUrl: "https://zenui.net",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
