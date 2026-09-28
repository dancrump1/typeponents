import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "curtain-page-transition",
	title: "Curtain Page Transition",
	description: "A premium curtain split transition effect that splits horizontally or vertically to reveal new content, built with Framer Motion.",
	interaction: "Programmatically triggered on route change or view swaps, splitting the viewport in two halves that slide outwards to reveal the next state.",
	categories: ["Special Effects & FX"],
	tags: [],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/curtain-page-transition",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "trigger", type: "number", required: true },
		{ name: "onViewSwap", type: "(() => void)" },
		{ name: "className", type: "string" },
		{ name: "panelClassName", type: "string" },
		{ name: "duration", type: "number", default: "0.8" },
		{ name: "ease", type: "Easing | Easing[]", default: "[0.76, 0, 0.24, 1]" },
		{ name: "direction", type: "\"vertical\" | \"horizontal\"", default: "\"horizontal\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
