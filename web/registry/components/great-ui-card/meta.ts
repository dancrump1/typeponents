import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "great-ui-card",
	title: "Card",
	description: "A card component that displays an image, a title, and a date, and highlights custom divider lines on hover.",
	interaction: "Hover divider line scaling.",
	categories: ["Cards"],
	tags: ["hover"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/card",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
