import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "linear-dialog",
	title: "Linear Dialog",
	description: "",
	interaction: "",
	categories: ["Modals"],
	tags: ["keyboard"],
	inspiration: {
		source: "UI Layouts",
		url: "https://www.ui-layouts.com/components/linear-card",
		authorUrl: "https://www.ui-layouts.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "transition", type: "Transition" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
