import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tabbed-faq",
	title: "Tabbed FAQ",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	inspiration: {
		source: "UI Layouts",
		url: "https://www.ui-layouts.com/blocks/faq-section",
		authorUrl: "https://www.ui-layouts.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react"],
	registryDependencies: ["panel-accordion"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
