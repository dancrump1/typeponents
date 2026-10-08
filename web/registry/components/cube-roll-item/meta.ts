import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "cube-roll-item",
	title: "Cube Roll Item",
	description: "A numbered section index where each row is a 3D drum that rolls a quarter turn onto a filled face on hover. The roll follows the pointer — in from the top rolls down, out through the bottom keeps rolling down — while the rules draw in on load.",
	interaction: "Each row is a four-sided drum that rolls toward the pointer onto a filled face with an arrow. On load the rows flip over one by one.",
	categories: ["Navigation"],
	tags: ["hover", "cursor-tracking", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/cube-roll-item",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "CubeRollItemEntry[]", default: "DEFAULT_ITEMS", description: "Rows in the list, numbered in order. Defaults to a four-row sample." },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
