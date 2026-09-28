import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "how-it-works",
	title: "How It Works",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	inspiration: {
		source: "chamaac.com",
		url: "https://www.chamaac.com/components/sections/how-it-works",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "features", type: "Step[]" },
		{ name: "className", type: "string" },
		{ name: "stepPositions", type: "StepPosition[]" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
