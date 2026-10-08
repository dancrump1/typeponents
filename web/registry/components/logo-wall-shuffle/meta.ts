import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "logo-wall-shuffle",
	title: "Logo Wall Shuffle",
	description: "An integrations wall of staggered logo tiles where one mark at a time lifts away and the next rises in behind it. Every tile is visited before any repeats, and the loop pauses off-screen and in background tabs.",
	interaction: "Tiles sit in staggered columns. On a loop one mark lifts away and the next rises in behind it, blurring through the change. The loop pauses off screen.",
	categories: ["Grids & Layouts"],
	tags: ["scroll-driven", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/logo-wall-shuffle",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "logos", type: "LogoWallLogo[]", description: "Marks cycled through the wall. Needs more logos than tiles to keep moving.", required: true },
		{ name: "title", type: "ReactNode", default: "DEFAULT_TITLE", description: "Section heading." },
		{ name: "description", type: "string", default: "DEFAULT_DESCRIPTION", description: "Supporting line under the heading." },
		{ name: "columns", type: "number[]", default: "DEFAULT_COLUMNS", description: "Tiles per column, left to right. Every other column drops down." },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
