import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "circular-theme-provider",
	title: "Circular Theme Provider",
	description: "A transition manager that switches between light and dark themes using a custom circular clip-path view transition centered at the user's cursor position or specified coordinates.",
	interaction: "Triggered by user clicks or programmatically. Wipes the screen outward in an expanding circle.",
	categories: ["Special Effects & FX"],
	tags: ["cursor-tracking", "responsive"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/circular-theme-provider",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["next-themes"],
	registryDependencies: [],
	props: [
		{ name: "duration", type: "number", default: "500" },
		{ name: "easing", type: "string", default: "\"ease-in-out\"" },
		{ name: "onTransition", type: "(() => void)" },
		{ name: "theme", type: "\"light\" | \"dark\"" },
		{ name: "onThemeChange", type: "((theme: \"light\" | \"dark\") => void)" },
		{ name: "defaultCenter", type: "TransitionOrigin" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
