import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "horizontal-scroll",
	title: "Horizontal Scroll",
	description: "A scrollable component that displays images in a horizontal carousel layout with 3D rotation effects. As you scroll vertically, the images animate with smooth horizontal movement, perspective transforms, and dynamic blur effects to create an immersive visual experience.",
	interaction: "Vertical scroll drives a 3D horizontal carousel of images.",
	categories: ["Scroll"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/horizontalscroll",
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
