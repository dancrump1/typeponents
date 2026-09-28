import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "clip-path-svg-mask",
	title: "Clip Path SVG Mask",
	description: "",
	interaction: "",
	categories: ["Images"],
	tags: ["hover"],
	inspiration: {
		source: "skiper-ui.com",
		url: "https://skiper-ui.com/v1/skiper66",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "imgSrc", type: "string", required: true },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
