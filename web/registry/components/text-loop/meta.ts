import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-loop",
	title: "Text Loop",
	description:
		"Endless ticker of repeating words riding a coloured ribbon bent into a wave, circle, infinity loop, arch or straight line.",
	interaction:
		"The text travels continuously along the ribbon with no seam where it wraps; hovering pauses the run and moving away starts it again.",
	categories: ["Text Animations", "Special Effects & FX"],
	tags: ["responsive"],
	inspiration: {
		source: "React Bits",
		url: "https://reactbits.dev/text-animations/text-loop",
		authorUrl: "https://reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "'React ✦ Bits'" },
		{ name: "shape", type: "TextLoopShape", default: "'wave'" },
		{ name: "path", type: "string" },
		{ name: "speed", type: "number", default: "90" },
		{ name: "direction", type: "TextLoopDirection", default: "'forward'" },
		{ name: "separator", type: "string", default: "'✦'" },
		{ name: "curviness", type: "number", default: "90" },
		{ name: "fontSize", type: "number", default: "46" },
		{ name: "fontWeight", type: "string | number", default: "800" },
		{ name: "letterSpacing", type: "number", default: "2" },
		{ name: "uppercase", type: "boolean", default: "true" },
		{ name: "color", type: "string", default: "'#ffffff'" },
		{ name: "ribbon", type: "boolean", default: "true" },
		{ name: "ribbonColor", type: "string", default: "'#5227FF'" },
		{ name: "ribbonWidth", type: "number", default: "86" },
		{ name: "pauseOnHover", type: "boolean", default: "true" },
		{ name: "className", type: "string", default: "''" },
		{ name: "style", type: "CSSProperties", default: "{}" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
