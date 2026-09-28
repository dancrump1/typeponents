import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-roll",
	title: "Text Roll",
	description: "",
	interaction: "",
	categories: ["Text", "Text Animations"],
	tags: [],
	inspiration: {
		source: "Motion Primitives",
		url: "https://motion-primitives.com/docs/text-roll",
		authorUrl: "https://motion-primitives.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "duration", type: "number", default: "0.5" },
		{ name: "getEnterDelay", type: "((index: number) => number)", default: "(i) => i * 0.1" },
		{ name: "getExitDelay", type: "((index: number) => number)", default: "(i) => i * 0.1 + 0.2" },
		{ name: "className", type: "string" },
		{ name: "transition", type: "Transition", default: "{ ease: \"easeIn\" }" },
		{ name: "variants", type: "{ enter: { initial: Target | VariantLabels | boolean; ani…" },
		{ name: "onAnimationComplete", type: "(() => void)" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
