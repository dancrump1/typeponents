import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "diagonal-marquee-carousel",
	title: "Diagonal Marquee Carousel",
	description: "A premium diagonally slanted, infinitely scrolling marquee showing cards or landscapes with offset speeds, alternating directions, and soft gradients.",
	interaction: "Infinite linear scroll with custom angles, layout parameters, and card-zoom states.",
	categories: ["Carousels"],
	tags: ["hover"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/diagonal-marquee-carousel",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "cards", type: "CardItem[]", default: "DEFAULT_CARDS" },
		{ name: "angle", type: "number", default: "-25" },
		{ name: "duration", type: "number", default: "120" },
		{ name: "alternateDirections", type: "boolean", default: "true" },
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "cardClassName", type: "string", default: "\"\"" },
		{ name: "fadeClassName", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
