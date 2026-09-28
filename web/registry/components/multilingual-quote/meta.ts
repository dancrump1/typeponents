import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "multilingual-quote",
	title: "Multilingual Quote",
	description: "An animated quote section component with multi-language support.",
	interaction: "Language toggle with smooth animated text transitions.",
	categories: ["Text Animations"],
	tags: ["hover"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/multilingual-quote",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "quotes", type: "Quote[]", required: true },
		{ name: "authorName", type: "string", required: true },
		{ name: "defaultLanguage", type: "string" },
		{ name: "authorLink", type: "string" },
		{ name: "className", type: "string" },
		{ name: "quoteClassName", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
