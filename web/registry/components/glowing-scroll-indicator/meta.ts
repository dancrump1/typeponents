import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "glowing-scroll-indicator",
	title: "Glowing Scroll Indicator",
	description: "A visual scroll indicator that shows animated glowing bars that light up and grow as you scroll down the page. Features a smooth red marker that moves across the bars to show your exact scroll position, creating an eye-catching glowing wave effect.",
	interaction: "Glowing bars grow as you scroll, with a marker tracking exact position.",
	categories: ["Scroll"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/glowingscrollindicator",
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
