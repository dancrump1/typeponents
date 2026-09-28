import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "circle-text",
	title: "Circle Text",
	description: "",
	interaction: "",
	categories: ["Text"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/text-animations/circular-text",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", required: true },
		{ name: "spinDuration", type: "number", default: "20" },
		{ name: "onHover", type: "\"slowDown\" | \"speedUp\" | \"pause\" | \"goBonkers\"", default: "\"speedUp\"" },
		{ name: "className", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
