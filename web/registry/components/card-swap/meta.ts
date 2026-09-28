import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "card-swap",
	title: "Card Swap",
	description:
		"Slanted 3D stack of cards in the corner of a section that deals itself through on a timer.",
	interaction:
		"Runs on its own — every few seconds the front card drops away, the rest step forward into its place, and the dropped card rises back on at the rear; it can be set to hold still while the pointer rests on the stack, and cards can be clicked.",
	categories: ["Cards"],
	tags: ["featured", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/components/card-swap",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [
		{ name: "width", type: "string | number", default: "500" },
		{ name: "height", type: "string | number", default: "400" },
		{ name: "cardDistance", type: "number", default: "60" },
		{ name: "verticalDistance", type: "number", default: "70" },
		{ name: "delay", type: "number", default: "5000" },
		{ name: "pauseOnHover", type: "boolean", default: "false" },
		{ name: "onCardClick", type: "((idx: number) => void)" },
		{ name: "skewAmount", type: "number", default: "6" },
		{ name: "easing", type: "\"linear\" | \"elastic\"", default: "\"elastic\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 9,
	status: "needs-review",
});
