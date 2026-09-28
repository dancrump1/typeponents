import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "sine-wave",
	title: "Sine Wave",
	description: "An animated component that arranges items in a sine wave pattern with smooth spring animations. Perfect for creating dynamic, flowing layouts with customizable amplitude and frequency.",
	interaction: "Thumbnails settle onto a sine curve with a staggered spring.",
	categories: ["Images"],
	tags: ["spring"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/sineWave",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ image: string; }[]", required: true },
		{ name: "amplitude", type: "number", default: "100" },
		{ name: "frequency", type: "number", default: "5" },
		{ name: "shouldAnimate", type: "boolean", default: "true" },
		{ name: "itemClassName", type: "string", default: "''" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
