import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "magic-bento",
	title: "Magic Bento",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "React Bits",
		url: "https://reactbits.dev/components/magic-bento",
		authorUrl: "https://reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [
		{ name: "textAutoHide", type: "boolean", default: "true" },
		{ name: "enableStars", type: "boolean", default: "true" },
		{ name: "enableSpotlight", type: "boolean", default: "true" },
		{ name: "enableBorderGlow", type: "boolean", default: "true" },
		{ name: "disableAnimations", type: "boolean", default: "false" },
		{ name: "spotlightRadius", type: "number", default: "DEFAULT_SPOTLIGHT_RADIUS" },
		{ name: "particleCount", type: "number", default: "DEFAULT_PARTICLE_COUNT" },
		{ name: "enableTilt", type: "boolean", default: "false" },
		{ name: "glowColor", type: "string", default: "DEFAULT_GLOW_COLOR" },
		{ name: "clickEffect", type: "boolean", default: "true" },
		{ name: "enableMagnetism", type: "boolean", default: "true" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
