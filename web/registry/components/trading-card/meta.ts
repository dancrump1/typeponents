import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "trading-card",
	title: "Trading Card",
	description: "A card that moves in 3D when you hover over it. Perfect for showcasing profiles, characters, or products with engaging effects.",
	interaction: "The card tilts in 3D to follow the pointer, catching a specular highlight.",
	categories: ["Cards"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/tradingCard",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "imageUrl", type: "string", required: true },
		{ name: "rank", type: "number", required: true },
		{ name: "name", type: "string", required: true },
		{ name: "description", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
