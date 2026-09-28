import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dominoes-scroll-indicator",
	title: "Dominoes Scroll Indicator",
	description: "A scroll indicator that shows domino-like bars that rotate as you scroll through content. Each bar rotates at different positions to create a cascading effect.",
	interaction: "A stack of bars rotates in sequence to show how far you've scrolled.",
	categories: ["Scroll"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/dominoesscrollindicator",
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
