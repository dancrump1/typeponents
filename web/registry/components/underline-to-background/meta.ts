import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "underline-to-background",
	title: "Underline To Background",
	description: "",
	interaction: "",
	categories: ["Text Animations"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/text/underline-to-background",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "label", type: "string", required: true },
		{ name: "className", type: "string" },
		{ name: "transition", type: "ValueAnimationTransition<any>", default: "{ type: \"spring\", damping: 30, stiffn…" },
		{ name: "onClick", type: "(() => void)" },
		{ name: "targetTextColor", type: "string", default: "\"#fef\"" },
		{ name: "underlineHeightRatio", type: "number", default: "0.1" },
		{ name: "underlinePaddingRatio", type: "number", default: "0.01" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
