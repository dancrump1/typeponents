import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "horizontal-scroll-gallery",
	title: "Horizontal Scroll Gallery",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["scroll-driven", "hover"],
	inspiration: {
		source: "edilozi.pro",
		url: "https://www.edilozi.pro/docs/components/horizontal-scroll",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
