import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "checkbox-animated",
	title: "Checkbox Animated",
	description:
		"Checkbox drawn as a single continuous stroke that turns from a rounded square into a tick.",
	interaction:
		"Clicking it redraws the outline as one unbroken line: the square unwinds and reforms into a checkmark, and clicking again runs the same line back into a square.",
	categories: ["Forms & Inputs"],
	tags: [],
	inspiration: {
		source: "berlix.vercel.app",
		url: "https://berlix.vercel.app/docs/checkbox",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "checked", type: "boolean", required: true },
		{ name: "onClick", type: "() => void", required: true },
		{ name: "size", type: "number", default: "32" },
		{ name: "color", type: "string", default: "\"#00e599\"" },
		{ name: "duration", type: "number", default: "1" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
