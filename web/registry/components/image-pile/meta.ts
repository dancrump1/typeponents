import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "image-pile",
	title: "Image Pile",
	description: "A stack of images that shuffle and change positions automatically. Perfect for creating dynamic image galleries and portfolios.",
	interaction: "A stack of photos shuffles which one sits on top on a timer.",
	categories: ["Images"],
	tags: ["autoplay"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/imagepile",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "images", type: "string[]", required: true },
		{ name: "speed", type: "number", default: "2" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
