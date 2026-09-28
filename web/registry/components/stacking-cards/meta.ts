import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "stacking-cards",
	title: "Stacking Cards",
	description:
		"A column of full-height cards that pin to the top of the screen and pile up on each other as you scroll.",
	interaction:
		"Scrolling holds each card in place while the next one slides over it; the cards underneath shrink slightly so the stack looks like a deck growing behind the one you are reading.",
	categories: ["Cards"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/blocks/stacking-cards",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "totalCards", type: "number", required: true },
		{ name: "scrollOptons", type: "any" },
		{ name: "scaleMultiplier", type: "number" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
