import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scroll-horizontal",
	title: "Scroll Horizontal",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: [],
	inspiration: {
		source: "UI Layouts",
		url: "https://www.ui-layouts.com/components/horizontal-scroll",
		authorUrl: "https://www.ui-layouts.com",
		relationship: "adaptation",
	},
	dependencies: ["lenis", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
