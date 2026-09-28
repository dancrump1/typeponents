import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-rotate",
	title: "Text Rotate",
	description: "",
	interaction: "",
	categories: ["Text", "Text Animations"],
	tags: ["spring", "autoplay"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/text/text-rotate",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
