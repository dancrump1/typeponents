import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dither",
	title: "Dither",
	description:
		"Full-bleed WebGL background of drifting noise waves, posterised into a coarse retro dither pattern of chunky pixels.",
	interaction:
		"Runs on its own — the wave pattern crawls and reshapes in a slow loop. Moving the pointer over it presses a soft dark hollow into the noise that follows the cursor.",
	categories: ["Backgrounds"],
	tags: ["webgl", "cursor-tracking"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/backgrounds/dither",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["@react-three/fiber", "@react-three/postprocessing", "postprocessing", "three"],
	registryDependencies: [],
	props: [
		{ name: "waveSpeed", type: "number", default: "0.05" },
		{ name: "waveFrequency", type: "number", default: "3" },
		{ name: "waveAmplitude", type: "number", default: "0.3" },
		{ name: "waveColor", type: "[number, number, number]", default: "[0.5, 0.5, 0.5]" },
		{ name: "colorNum", type: "number", default: "4" },
		{ name: "pixelSize", type: "number", default: "2" },
		{ name: "disableAnimation", type: "boolean", default: "false" },
		{ name: "enableMouseInteraction", type: "boolean", default: "true" },
		{ name: "mouseRadius", type: "number", default: "1" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
