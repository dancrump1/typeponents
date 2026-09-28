import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-enhanced",
	title: "Text Enhanced",
	description:
		"Bold italic word stacked with a staircase of coloured drop shadows fanning out behind it.",
	interaction:
		"Hovering the word collapses the whole stack of coloured shadows, leaving flat type; moving away lets the shadows fan back out behind it.",
	categories: ["Text"],
	tags: ["hover"],
	inspiration: {
		source: "Kokonut UI",
		url: "https://kokonutui.com/docs/components/text#text---enhanced",
		authorUrl: "https://kokonutui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "\"DRIVE\"" },
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "shadowColors", type: "{ first?: string; second?: string; third?: string; fourth…", default: "{ first: \"#07bccc\", second: \"#e601c0\"…" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
