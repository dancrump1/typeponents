import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "card-rotation",
	title: "Card Rotation",
	description:
		"Draggable horizontal row of square cards seen in perspective, with the row fading out at both edges.",
	interaction:
		"Press and drag sideways to scroll the row along; clicking a card flips it over and scales it up while the cards around it turn away, shrink and fade by distance, and clicking again returns the row to flat.",
	categories: ["Cards"],
	tags: ["cursor-tracking"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
