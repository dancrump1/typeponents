import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scrollable-card-stack",
	title: "Scrollable Card Stack",
	description:
		"Deck of video cards stacked front to back, each one behind sitting a little higher, smaller and fainter, with dots underneath for position.",
	interaction:
		"Scrolling the wheel over the deck, swiping up or down, pressing the arrow keys or clicking a dot advances one card at a time, with the front card giving way as the whole stack shuffles forward a step. Hovering the front card nudges it slightly larger.",
	categories: ["Cards"],
	tags: ["spring", "hover", "cursor-tracking", "keyboard", "autoplay"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "CardItem[]", required: true },
		{ name: "cardHeight", type: "number", default: "384" },
		{ name: "perspective", type: "number", default: "1000" },
		{ name: "transitionDuration", type: "number", default: "180" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
