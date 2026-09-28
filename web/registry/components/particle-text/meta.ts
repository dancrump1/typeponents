import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "particle-text",
	title: "Particle Text",
	description:
		"Text that dissolves into particles and reforms.",
	interaction:
		"Characters break into particles on trigger, then settle back into glyphs.",
	categories: ["Text Animations"],
	tags: ["canvas", "cursor-tracking", "autoplay", "responsive"],
	inspiration: {
		source: "React Bits",
		url: "https://reactbits.dev/text-animations/particle-text",
		authorUrl: "https://reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "'React Bits'" },
		{ name: "particleSize", type: "number", default: "2" },
		{ name: "density", type: "number", default: "4" },
		{ name: "color", type: "string", default: "'#ffffff'" },
		{ name: "highlightColor", type: "string", default: "'#8b5cf6'" },
		{ name: "scatter", type: "number", default: "180" },
		{ name: "gatherDuration", type: "number", default: "1600" },
		{ name: "stagger", type: "number", default: "420" },
		{ name: "pointerRepel", type: "number", default: "40" },
		{ name: "repelRadius", type: "number", default: "120" },
		{ name: "idleDrift", type: "number", default: "0.7" },
		{ name: "trigger", type: "\"mount\" | \"hover\" | \"click\"", default: "'mount'" },
		{ name: "fontSize", type: "string | number", default: "'clamp(3rem, 12vw, 8rem)'" },
		{ name: "fontWeight", type: "string | number", default: "800" },
		{ name: "fontFamily", type: "string", default: "'inherit'" },
		{ name: "glow", type: "boolean", default: "true" },
		{ name: "className", type: "string", default: "''" },
		{ name: "style", type: "CSSProperties" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
