import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tool-tip",
	title: "Tool Tip",
	description: "",
	interaction: "",
	categories: ["Utilities"],
	tags: ["spring", "hover", "cursor-tracking"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/animated-tooltip",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ id: number; firstName: string; jobTitle: string; image:…", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
