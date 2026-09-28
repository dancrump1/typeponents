import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "accordion-solutions",
	title: "Accordion Solutions",
	description:
		"Stacked list of solution cards beside a large preview image, with one card expanded at a time.",
	interaction:
		"Clicking a card grows it to reveal its description and a Learn more bar over a violet gradient, collapses the one that was open, and cross-fades the preview image to match.",
	categories: ["Accordions"],
	tags: ["hover"],
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [
		{ name: "solutions", type: "{ id: number; title: string; description: string; imgSrc:…", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
