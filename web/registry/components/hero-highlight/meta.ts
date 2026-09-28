import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hero-highlight",
	title: "Hero Highlight",
	description: "",
	interaction: "",
	categories: ["Text"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/hero-highlight",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "containerClassName", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
