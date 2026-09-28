import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "eagle-vision",
	title: "Eagle Vision",
	description: "A visual effect inspired by Assassin's Creed that shows rotating rings following your mouse cursor. The rings get smaller and turn green when you hover over target elements, creating an immersive gaming-style interface.",
	interaction: "Rotating rings follow the cursor and tighten to green when they find a target.",
	categories: ["Cursor & Pointer Effects"],
	tags: ["spring", "cursor-tracking"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/eagleVision",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
