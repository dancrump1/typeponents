import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-reveal",
	title: "Text Reveal",
	description: "",
	interaction: "",
	categories: ["Text", "Text Animations"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/text-reveal-card",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion", "tailwind-merge"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", required: true },
		{ name: "revealText", type: "string", required: true },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
