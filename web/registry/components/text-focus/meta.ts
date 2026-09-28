import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-focus",
	title: "Text Focus",
	description:
		"Blurred sentence with one word held sharp inside a glowing camera-style focus bracket.",
	interaction:
		"The focus bracket travels from word to word on its own, sharpening each word as it arrives and blurring the rest; in manual mode it follows whichever word you hover instead.",
	categories: ["Text"],
	tags: ["hover", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/text-animations/true-focus",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "sentence", type: "string", default: "\"True Focus\"" },
		{ name: "manualMode", type: "boolean", default: "false" },
		{ name: "blurAmount", type: "number", default: "5" },
		{ name: "borderColor", type: "string", default: "\"green\"" },
		{ name: "glowColor", type: "string", default: "\"rgba(0, 255, 0, 0.6)\"" },
		{ name: "animationDuration", type: "number", default: "0.5" },
		{ name: "pauseBetweenAnimations", type: "number", default: "1" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
