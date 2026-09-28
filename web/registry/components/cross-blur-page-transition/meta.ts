import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "cross-blur-page-transition",
	title: "CrossBlur Page Transition",
	description: "A layout utilizing soft filters and cross-fading blurs to create a gentle transition between pages.",
	interaction: "Programmatically triggered on route change or view swaps, applying a soft blur over the screen.",
	categories: ["Special Effects & FX"],
	tags: [],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/cross-blur-page-transition",
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
		{ name: "duration", type: "number", default: "0.6" },
		{ name: "maxBlur", type: "number", default: "20" },
		{ name: "ease", type: "Easing | Easing[]", default: "\"easeInOut\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
