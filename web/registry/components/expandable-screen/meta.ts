import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "expandable-screen",
	title: "Expandable Screen",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	inspiration: {
		source: "Cult UI",
		url: "https://www.cult-ui.com/docs/components/expandable-screen",
		authorUrl: "https://www.cult-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "defaultExpanded", type: "boolean", default: "false" },
		{ name: "onExpandChange", type: "((expanded: boolean) => void)" },
		{ name: "layoutId", type: "string", default: "\"expandable-card\"" },
		{ name: "triggerRadius", type: "string", default: "\"100px\"" },
		{ name: "contentRadius", type: "string", default: "\"24px\"" },
		{ name: "animationDuration", type: "number", default: "0.3" },
		{ name: "lockScroll", type: "boolean", default: "true" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
