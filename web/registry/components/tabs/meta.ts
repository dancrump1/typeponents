import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tabs",
	title: "Tabs",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/tabs",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "tabs", type: "Tab[]", required: true },
		{ name: "containerClassName", type: "string" },
		{ name: "activeTabClassName", type: "string" },
		{ name: "tabClassName", type: "string" },
		{ name: "contentClassName", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
