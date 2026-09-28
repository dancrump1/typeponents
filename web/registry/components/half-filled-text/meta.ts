import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "half-filled-text",
	title: "Half Filled Text",
	description: "",
	interaction: "",
	categories: ["Text"],
	tags: [],
	inspiration: {
		source: "Namer UI",
		url: "https://namer-ui.netlify.app/components",
		authorUrl: "https://namer-ui.netlify.app",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "inscription", type: "string", required: true },
		{ name: "fontSize", type: "string", required: true },
		{ name: "fillColor", type: "string", required: true },
		{ name: "outlineColor", type: "string", required: true },
		{ name: "outlineWidth", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
