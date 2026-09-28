import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "trippy",
	title: "Trippy",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["cursor-tracking"],
	inspiration: {
		source: "GitHub",
		url: "https://github.com/tkh44/data-driven-motion/blob/master/demo/src/demos/Trippy.js",
		author: "tkh44",
		authorUrl: "https://github.com/tkh44",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "data", type: "unknown[]", default: "DEFAULT_DATA" },
		{ name: "circleSize", type: "number", default: "48" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
