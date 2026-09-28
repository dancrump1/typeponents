import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "cutout-card",
	title: "Cutout Card",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Cult UI",
		url: "https://www.cult-ui.com/docs/components/cutout-card",
		authorUrl: "https://www.cult-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["@radix-ui/react-use-controllable-state", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
