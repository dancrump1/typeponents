import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "chroma-grid",
	title: "Chroma Grid",
	description:
		"Grid of profile cards held in greyscale, with a circular window of full colour that follows the pointer.",
	interaction:
		"Moving across the grid drags a soft round patch of colour and brightness with it, lagging slightly behind the pointer; the card underneath also picks up a glow where the pointer sits, and the whole grid drains back to grey when you leave.",
	categories: ["Grids & Layouts"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/components/chroma-grid",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "ChromaItem[]" },
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "radius", type: "number", default: "300" },
		{ name: "damping", type: "number", default: "0.45" },
		{ name: "fadeOut", type: "number", default: "0.6" },
		{ name: "ease", type: "string", default: "\"power3.out\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
