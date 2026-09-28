import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "blur-fade-theme-transition",
	title: "Blur Fade Theme Transition",
	description: "A simple and elegant theme provider that cross-fades and blurs between light and dark modes.",
	interaction: "Triggered programmatically. Smoothly cross-fades and blurs the screen during theme changes.",
	categories: ["Special Effects & FX"],
	tags: ["responsive"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/blur-fade-theme-transition",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["next-themes"],
	registryDependencies: [],
	props: [
		{ name: "duration", type: "number", default: "500" },
		{ name: "maxBlur", type: "number", default: "16" },
		{ name: "easing", type: "string", default: "\"ease-in-out\"" },
		{ name: "onTransition", type: "(() => void)" },
		{ name: "theme", type: "\"light\" | \"dark\"" },
		{ name: "onThemeChange", type: "((theme: \"light\" | \"dark\") => void)" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
