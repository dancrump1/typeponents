import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-proximity",
	title: "Text Proximity",
	description: "",
	interaction: "",
	categories: ["Text"],
	tags: ["autoplay"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/text/text-cursor-proximity",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	notes: "3 demos: demo.tsx, demo-textblockproximity.tsx, demo-textcursorproximity.tsx.",
});
