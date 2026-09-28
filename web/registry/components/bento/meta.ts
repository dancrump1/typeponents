import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "bento",
	title: "Bento",
	description:
		"Bento grid of uneven tiles, each with an image, icon, title and short blurb, that link somewhere when clicked.",
	interaction:
		"Hovering a tile deepens its shadow and nudges the text block to the right; on the full-background tiles the caption slides up to make room for a link that fades in along the bottom, with its arrows lighting up in sequence.",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/bento-grid",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["@tabler/icons-react"],
	registryDependencies: ["button", "fuzzy-overlay"],
	props: [
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
