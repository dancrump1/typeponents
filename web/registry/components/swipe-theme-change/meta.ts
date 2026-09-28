import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "swipe-theme-change",
	title: "Swipe Theme Provider",
	description: "A transition manager that switches between light and dark themes using a directional wipe/swipe transition via the Web View Transition API.",
	interaction: "Triggered programmatically or using directional controls. Wipes the screen in the selected direction.",
	categories: ["Special Effects & FX"],
	tags: ["responsive"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/swipe-theme-change",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["next-themes"],
	registryDependencies: [],
	props: [
		{ name: "duration", type: "number", default: "650" },
		{ name: "easing", type: "string", default: "\"ease-in-out\"" },
		{ name: "onSwipe", type: "(() => void)" },
		{ name: "theme", type: "\"light\" | \"dark\"" },
		{ name: "onThemeChange", type: "((theme: \"light\" | \"dark\") => void)" },
		{ name: "getKeyframes", type: "((dir: SwipeDirection) => Keyframe[] | PropertyIndexedKey…" },
		{ name: "direction", type: "SwipeDirection" },
		{ name: "angle", type: "number", default: "0" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
