import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "card-hover",
	title: "Card Hover",
	description:
		"Grid of linked title-and-description cards with a rounded highlight panel that follows the pointer.",
	interaction:
		"Hovering a card fades a soft rounded block in behind it and outlines its border; moving to another card glides that block across to the new one rather than making it reappear.",
	categories: ["Cards"],
	tags: ["hover"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/card-hover-effect",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ title: string; description: string; link: string; }[]", required: true },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
