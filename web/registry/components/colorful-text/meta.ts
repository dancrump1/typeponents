import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "colorful-text",
	title: "Colorful Text",
	description:
		"Headline text where every letter takes its own colour from a rotating rainbow palette.",
	interaction:
		"Runs on its own — every few seconds the palette reshuffles and the letters recolour in a left-to-right ripple, each one blurring, fading and hopping up slightly as its new colour lands.",
	categories: ["Text"],
	tags: ["autoplay"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/colourful-text",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
