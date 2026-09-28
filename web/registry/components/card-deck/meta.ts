import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "card-deck",
	title: "Card Deck",
	description:
		"Stack of image cards that fans out into a tilted 3D spread and pulls one card forward when picked.",
	interaction:
		"Hovering the stack fans the cards out one after another, each turned away and stepped back in depth; clicking a card blurs the rest and floats that one forward at larger size, and clicking it again drops it back into the pile.",
	categories: ["Cards"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Serenity UI",
		url: "https://www.serenity-ui.com/components/cards/3dflipcard",
		authorUrl: "https://www.serenity-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "images", type: "{ src: string; alt: string; }[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
