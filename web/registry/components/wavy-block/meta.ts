import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "wavy-block",
	title: "Wavy Block",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["spring", "scroll-driven"],
	inspiration: {
		source: "systaliko-ui.vercel.app",
		url: "https://systaliko-ui.vercel.app/docs/scroll-animations/wavy-block",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "index", type: "number", required: true },
		{ name: "config", type: "Partial<WavyTextsConfig>" },
		{ name: "axis", type: "\"x\" | \"y\"", default: "'x'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
