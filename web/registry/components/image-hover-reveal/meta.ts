import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "image-hover-reveal",
	title: "Image Hover Reveal",
	description: "A dual-image avatar surface implementing directional hover reveals and cursor coordinate tracking spring slices.",
	interaction: "Hover entry angle detection, coordinate tracking springs, clip path interpolation, and dual state cross-fade reveals.",
	categories: ["Images"],
	tags: ["spring", "hover", "cursor-tracking"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/image-hover-reveal",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "src", type: "string", default: "DEFAULT_IMAGE" },
		{ name: "overlaySrc", type: "string" },
		{ name: "alt", type: "string", default: "\"Avatar Hover\"" },
		{ name: "variant", type: "\"directional\" | \"slice\"", default: "\"directional\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
