import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "pixel-page-transition",
	title: "Pixel Page Transition",
	description: "A full-screen block pixel dissolve page transition where grids of random shuffled pixels fade in and out using Framer Motion.",
	interaction: "Programmatically triggered on route change or view swaps, filling the screen with a grid of block pixels in a shuffled random order, then dissolving them to reveal content.",
	categories: ["Special Effects & FX"],
	tags: [],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/pixel-page-transition",
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
		{ name: "pixelSize", type: "number", default: "40" },
		{ name: "duration", type: "number", default: "0.2" },
		{ name: "staggerDuration", type: "number", default: "0.4" },
		{ name: "ease", type: "Easing | Easing[]", default: "\"easeInOut\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
