import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "stack-scroll",
	title: "Stack Scroll",
	description: "A scrollable component that displays images in a stacked card layout. As you scroll, the cards animate with smooth transitions, scaling, and positioning effects to create an engaging visual experience.",
	interaction: "Cards scale and restack as you scroll, like a deck being dealt.",
	categories: ["Scroll"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/stackScroll",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ image: string; }[]", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
