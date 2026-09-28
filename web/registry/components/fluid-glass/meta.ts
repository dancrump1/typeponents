import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fluid-glass",
	title: "Fluid Glass",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["webgl", "scroll-driven"],
	inspiration: {
		source: "React Bits",
		url: "https://reactbits.dev/components/fluid-glass",
		authorUrl: "https://reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["@react-three/drei", "@react-three/fiber", "maath", "three"],
	registryDependencies: [],
	props: [
		{ name: "mode", type: "Mode", default: "\"lens\"" },
		{ name: "lensProps", type: "ModeProps", default: "{}" },
		{ name: "barProps", type: "ModeProps", default: "{}" },
		{ name: "cubeProps", type: "ModeProps", default: "{}" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
