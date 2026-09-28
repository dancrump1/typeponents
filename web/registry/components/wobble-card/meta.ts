import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "wobble-card",
	title: "Wobble Card",
	description: "",
	interaction: "",
	categories: ["Cards", "Special Effects & FX"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/wobble-card",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "containerClassName", type: "string" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
