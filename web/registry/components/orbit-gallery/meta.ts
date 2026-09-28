import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "orbit-gallery",
	title: "Orbit Gallery",
	description:
		"WebGL gallery of image tiles laid out on concentric rings that orbit a shared centre at different speeds.",
	interaction:
		"The rings turn on their own; scrolling shoves them faster before they coast back to their normal pace. Hovering a tile dims it, clicking floats it to the centre as a large panel while the rings shrink back, and clicking the empty space or pressing Escape smears it away again.",
	categories: ["3D & Canvas", "Media Galleries"],
	tags: ["webgl", "keyboard"],
	inspiration: {
		source: "Atelier UI",
		url: "https://www.atelier-ui.com/en/docs/components/background/orbit-gallery",
		authorUrl: "https://www.atelier-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["@react-three/drei", "@react-three/fiber", "motion", "three"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ src: string; alt: string; }[]", required: true },
		{ name: "radius", type: "number", required: true },
		{ name: "rings", type: "number", required: true },
		{ name: "ringGap", type: "number", required: true },
		{ name: "tileHeight", type: "number", required: true },
		{ name: "cornerRadius", type: "number", required: true },
		{ name: "spinSpeed", type: "number", required: true },
		{ name: "spinStagger", type: "number", required: true },
		{ name: "wheel", type: "boolean", required: true },
		{ name: "wheelMultiplier", type: "number", required: true },
		{ name: "revealDuration", type: "number", required: true },
		{ name: "focusDuration", type: "number", required: true },
		{ name: "className", type: "string" },
		{ name: "onActiveChange", type: "((index: number | null) => void)" },
		{ name: "onReady", type: "(() => void)" },
		{ name: "mode", type: "\"texture\" | \"scissor\"", description: "- texture: children render into an FBO each frame: Global post-processing will work on it.\n- scissor: a scissored pass painted on top of the composed frame. lighter, but excluded from global post-processing." },
		{ name: "priority", type: "number" },
		{ name: "zIndex", type: "number" },
		{ name: "transparent", type: "boolean" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
