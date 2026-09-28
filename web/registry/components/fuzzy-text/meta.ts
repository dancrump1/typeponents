import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fuzzy-text",
	title: "Fuzzy Text",
	description: "",
	interaction: "",
	categories: ["Text"],
	tags: ["canvas", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/text-animations/fuzzy-text",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "fontSize", type: "string | number", default: "\"clamp(2rem, 8vw, 8rem)\"" },
		{ name: "fontWeight", type: "string | number", default: "900" },
		{ name: "fontFamily", type: "string", default: "\"inherit\"" },
		{ name: "color", type: "string", default: "\"#fff\"" },
		{ name: "enableHover", type: "boolean", default: "true" },
		{ name: "baseIntensity", type: "number", default: "0.18" },
		{ name: "hoverIntensity", type: "number", default: "0.5" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
