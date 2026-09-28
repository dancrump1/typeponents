import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "vertical-cut-reveal",
	title: "Vertical Cut Reveal",
	description: "",
	interaction: "",
	categories: ["Text Animations"],
	tags: ["spring"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/text/vertical-cut-reveal",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
