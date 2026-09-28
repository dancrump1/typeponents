import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-highlighter",
	title: "Text Highlighter",
	description:
		"Marker-pen highlight that sweeps across a phrase, in any of four directions and following the line wraps.",
	interaction:
		"The colour band wipes across the words like a highlighter stroke, left to right by default; it can be set to fire when the text scrolls into view, on hover, or straight away on load.",
	categories: ["Text"],
	tags: ["spring", "scroll-driven", "hover"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/text/text-highlighter",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["lenis", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
