import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dominoes-list-scroll",
	title: "Dominoes List Scroll",
	description: "A scrollable component that displays images with domino-like falling animations as you scroll. Each image rotates and falls like a domino piece, creating a smooth cascading effect that responds to your scroll position with realistic 3D shadows.",
	interaction: "Images tip over like dominos as you scroll, with optional 3D shadows.",
	categories: ["Scroll"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/dominoeslistscroll",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ image: string; }[]", required: true },
		{ name: "height", type: "number", default: "500" },
		{ name: "width", type: "number", default: "384" },
		{ name: "enableShadow", type: "boolean", default: "false" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
