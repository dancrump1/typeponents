import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "pixel-to-ascii-image",
	title: "Pixel To Ascii Image",
	description: "An image component that pixelates and then converts into ASCII art on hover.",
	interaction: "Hover triggers a procedural pixelation followed by an ASCII art conversion.",
	categories: ["Images"],
	tags: ["canvas", "spring", "hover", "autoplay"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/pixel-to-ascii-image",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["framer-motion", "motion"],
	registryDependencies: [],
	props: [
		{ name: "src", type: "string", required: true },
		{ name: "width", type: "number", default: "500" },
		{ name: "height", type: "number", default: "500" },
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "charSize", type: "number", default: "10" },
		{ name: "textColor", type: "string" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
