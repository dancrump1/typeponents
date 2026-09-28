import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "pixelated-carousel",
	title: "Pixelated Carousel",
	description: "A carousel that shows images with a pixelated effect. Images change with a grid animation that makes them look blocky.",
	interaction: "Images dissolve into a pixel grid before resolving into the next slide.",
	categories: ["Carousels"],
	tags: ["autoplay"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/pixelatedcarousel",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "images", type: "string[]", required: true },
		{ name: "pixelSize", type: "number", default: "100" },
		{ name: "animationDelayStep", type: "number", default: "0.02" },
		{ name: "pixelTransitionDuration", type: "number", default: "0.1" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
