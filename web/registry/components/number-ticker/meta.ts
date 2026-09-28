import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "number-ticker",
	title: "Number Ticker",
	description:
		"Numeric counter that runs up to its target figure, comma-grouped and set on fixed-width digits so it never jitters.",
	interaction:
		"The moment the number scrolls into view it races from zero to its final value and eases to a stop, counting down instead if you flip the direction. It fires once and can be held back by a delay.",
	categories: ["Data & Tables"],
	tags: ["spring", "scroll-driven"],
	inspiration: {
		source: "Magic UI",
		url: "https://magicui.design/docs/components/number-ticker",
		authorUrl: "https://magicui.design",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "value", type: "number", required: true },
		{ name: "direction", type: "\"up\" | \"down\"", default: "\"up\"" },
		{ name: "className", type: "string" },
		{ name: "delay", type: "number", default: "0" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
