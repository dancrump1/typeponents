import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scroll-horizontal-2",
	title: "Scroll Horizontal 2",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["scroll-driven", "hover"],
	inspiration: {
		source: "UI Layouts",
		url: "https://www.ui-layouts.com/components/horizontal-scroll",
		authorUrl: "https://www.ui-layouts.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
