import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-split2",
	title: "Text Split2",
	description:
		"Splits a string into letters or words so each piece can be animated independently.",
	interaction:
		"Renders each letter or word in its own mask, ready for staggered enter/hover animations.",
	categories: ["Text Animations"],
	tags: [],
	inspiration: {
		source: "Atelier UI",
		url: "https://www.atelier-ui.com/en/docs/components/text/text-bounce",
		authorUrl: "https://www.atelier-ui.com",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "splitBy", type: "SplitBy", default: "\"letters\"" },
		{ name: "showMask", type: "boolean", default: "true" },
		{ name: "renderItems", type: "((char: string, index: number) => ReactNode)" },
		{ name: "render", type: "RenderProp" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
