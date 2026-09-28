import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "split-theme-provider",
	title: "Split Theme Provider",
	description: "A transition manager that switches between light and dark themes using a vertical or horizontal split transition starting from the center (in-to-out) or edges (out-to-in).",
	interaction: "Triggered programmatically or using control buttons. Splits the viewport outward from the center, or inward from the edges.",
	categories: ["Special Effects & FX"],
	tags: ["responsive"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/split-theme-provider",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["next-themes"],
	registryDependencies: [],
	props: [
		{ name: "duration", type: "number", default: "600" },
		{ name: "easing", type: "string", default: "\"ease-in-out\"" },
		{ name: "onTransition", type: "(() => void)" },
		{ name: "theme", type: "\"light\" | \"dark\"" },
		{ name: "onThemeChange", type: "((theme: \"light\" | \"dark\") => void)" },
		{ name: "direction", type: "SplitDirection" },
		{ name: "mode", type: "SplitMode" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
