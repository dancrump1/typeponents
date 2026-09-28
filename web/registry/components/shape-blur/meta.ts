import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "shape-blur",
	title: "Shape Blur",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["webgl", "cursor-tracking", "autoplay", "responsive"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/backgrounds/shape-blur",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["three"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "variation", type: "number", default: "0" },
		{ name: "pixelRatioProp", type: "number", default: "2" },
		{ name: "shapeSize", type: "number", default: "1.2" },
		{ name: "roundness", type: "number", default: "0.4" },
		{ name: "borderSize", type: "number", default: "0.05" },
		{ name: "circleSize", type: "number", default: "0.3" },
		{ name: "circleEdge", type: "number", default: "0.5" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
