import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fab-grid",
	title: "Fab Grid",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["spring", "hover", "keyboard"],
	inspiration: {
		source: "easyui.pro",
		url: "https://www.easyui.pro/component",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "actions", type: "ActionItem[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
