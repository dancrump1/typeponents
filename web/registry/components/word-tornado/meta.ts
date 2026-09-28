import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "word-tornado",
	title: "Word Tornado",
	description: "",
	interaction: "",
	categories: ["Text Animations"],
	tags: ["autoplay", "responsive"],
	inspiration: {
		source: "Star UI",
		url: "https://starui.link/docs/components/word-galaxy",
		authorUrl: "https://starui.link",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
