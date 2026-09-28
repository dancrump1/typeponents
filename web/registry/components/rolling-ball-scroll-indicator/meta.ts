import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "rolling-ball-scroll-indicator",
	title: "Rolling Ball Scroll Indicator",
	description: "A scroll indicator that displays animated bars with a rolling ball that moves across them as you scroll. The bars grow and shrink based on your scroll position while a colorful ball rolls smoothly from left to right.",
	interaction: "A ball rolls across growing bars to mark scroll progress.",
	categories: ["Scroll"],
	tags: ["spring", "scroll-driven"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/rollingballscrollindicator",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "scrollContainerId", type: "string", default: "'scroll-target'" },
		{ name: "direction", type: "\"vertical\" | \"horizontal\"", default: "'vertical'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
