import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hover-card",
	title: "Hover Card",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["cursor-tracking"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/evervault-card",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
