import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "focus-cards",
	title: "Focus Cards",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["hover"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/focus-cards",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "cards", type: "Card[]", default: "cardsExamples" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
