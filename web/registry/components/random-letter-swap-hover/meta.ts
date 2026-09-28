import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "random-letter-swap-hover",
	title: "Random Letter Swap Hover",
	description:
		"Text label whose characters flip over to an identical copy in a shuffled order, so the swap scatters across the word.",
	interaction:
		"Hovering the label slides letters out one at a time in random order while matching letters drop in behind them. One variant plays the swap through once; the other holds it and runs it back in reverse when the pointer leaves.",
	categories: ["Text Animations"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/text/random-letter-swap",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["lodash", "motion"],
	registryDependencies: [],
	props: [
		{ name: "label", type: "string", required: true },
		{ name: "reverse", type: "boolean", default: "true" },
		{ name: "transition", type: "any", default: "{ type: \"spring\", duration: 0.8, }" },
		{ name: "staggerDuration", type: "number", default: "0.02" },
		{ name: "className", type: "string" },
		{ name: "onClick", type: "(() => void)" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
