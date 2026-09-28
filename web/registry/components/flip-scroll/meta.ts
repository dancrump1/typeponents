import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "flip-scroll",
	title: "Flip Scroll",
	description: "A scrollable component that displays images with 3D flip animations as you scroll. Each image flips to reveal a back face, creating an engaging card-flipping effect that responds to scroll position.",
	interaction: "Cards flip in 3D as you scroll, revealing a back face on each one.",
	categories: ["Scroll"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/flipScroll",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ image: string; }[]", required: true },
		{ name: "mode", type: "\"alternate\" | \"normal\"", default: "'normal'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
