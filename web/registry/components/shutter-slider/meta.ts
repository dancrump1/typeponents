import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "shutter-slider",
	title: "Shutter Slider",
	description: "An autoplaying feature slider. Each image opens through vertical slats that alternate from the top and bottom, the headline letters roll in like drum faces, copy lines rise through masks and the caption pulls into focus — all mirrored when you travel back.",
	interaction: "Each image opens through alternating vertical slats while the headline letters roll in and the copy rises line by line. Going back mirrors the motion. Hover pauses autoplay.",
	categories: ["Carousels"],
	tags: ["drag", "scroll-driven", "hover", "cursor-tracking", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/shutter-slider",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "slides", type: "ShutterSlide[]", default: "DEFAULT_SLIDES", description: "Slides, in order. Defaults to a three-slide sample." },
		{ name: "autoplay", type: "number", default: "6", description: "Seconds each slide holds before advancing. `0` turns autoplay off." },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
