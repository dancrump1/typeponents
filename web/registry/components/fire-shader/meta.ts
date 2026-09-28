import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fire-shader",
	title: "Fire Shader",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["webgl", "canvas", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "pro.lightswind.com",
		url: "https://pro.lightswind.com/components/fire-shader",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "timescale", type: "number", default: "0.5" },
		{ name: "scaleX", type: "number", default: "1.5" },
		{ name: "scaleY", type: "number", default: "0.3" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
