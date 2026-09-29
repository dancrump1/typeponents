import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "word-rotate",
	title: "Word Rotate",
	description: "A vertical rotation of words",
	interaction: "",
	categories: ["Text"],
	tags: [],
	inspiration: {
		source: "Magic UI",
		url: "https://magicui.design/docs/components/word-rotate",
		authorUrl: "https://magicui.design",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "draft",
	notes: "demo.tsx is an intake scaffold — replace it with a real usage example.",
});
