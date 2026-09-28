import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-curve",
	title: "Text Curve",
	description:
		"Oversized marquee whose repeating words run along a curved arc instead of a straight line.",
	interaction:
		"The words slide continuously around the curve on their own; dragging left or right pushes them along by hand, and letting go hands control back to the loop running in whichever direction you flicked it.",
	categories: ["Text"],
	tags: ["drag", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://reactbits.dev/text-animations/curved-loop",
		authorUrl: "https://reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "marqueeText", type: "string", default: "\"\"" },
		{ name: "speed", type: "number", default: "2" },
		{ name: "className", type: "string" },
		{ name: "curveAmount", type: "number", default: "400" },
		{ name: "direction", type: "\"left\" | \"right\"", default: "\"left\"" },
		{ name: "interactive", type: "boolean", default: "true" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
