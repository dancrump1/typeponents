import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "flow-scroll",
	title: "Flow Scroll",
	description: "A scrollable component that displays images in a flowing grid layout as you scroll. Each image smoothly scales and slides into view, creating a dynamic waterfall effect where images flow from the sides and center themselves, making your gallery feel alive and responsive to every scroll movement.",
	interaction: "Images scale and slide into a flowing grid as you scroll past them.",
	categories: ["Scroll"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/flowScroll",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "images", type: "string[]", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
