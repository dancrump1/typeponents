import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "canvas-reveal",
	title: "Canvas Reveal",
	description:
		"Full-panel grid of tiny coloured dots rendered on a canvas, fading out into the background at the top.",
	interaction:
		"On load the dots sweep in from the centre outwards, then keep flickering on their own at random, each one changing colour and brightness; it ignores the pointer.",
	categories: ["3D & Canvas"],
	tags: ["webgl"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/canvas-reveal-effect",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["@react-three/fiber", "motion", "three"],
	registryDependencies: [],
	props: [
		{ name: "animationSpeed", type: "number", default: "0.4", description: "0.1 - slower\n1.0 - faster" },
		{ name: "opacities", type: "number[]", default: "[0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0…" },
		{ name: "colors", type: "number[][]", default: "[[0, 255, 255]]" },
		{ name: "containerClassName", type: "string" },
		{ name: "dotSize", type: "number" },
		{ name: "showGradient", type: "boolean", default: "true" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
