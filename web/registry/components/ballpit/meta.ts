import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "ballpit",
	title: "Ballpit",
	description: "Pit of glossy 3D spheres that pile up and bounce off the walls of the frame.",
	interaction:
		"The balls drop in and settle on load, then scatter whenever the pointer moves across the frame as one ball tracks the cursor and knocks the rest around.",
	categories: ["Special Effects & FX"],
	tags: ["webgl", "canvas", "scroll-driven", "hover", "cursor-tracking", "autoplay", "responsive"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/backgrounds/ballpit",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["gsap", "three"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "followCursor", type: "boolean", default: "true" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
