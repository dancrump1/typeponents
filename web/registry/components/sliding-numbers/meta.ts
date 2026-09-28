import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "sliding-numbers",
	title: "Sliding Numbers",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["spring"],
	inspiration: {
		source: "Motion Primitives",
		url: "https://motion-primitives.com/docs/sliding-number",
		authorUrl: "https://motion-primitives.com",
		relationship: "adaptation",
	},
	dependencies: ["motion", "react-use-measure"],
	registryDependencies: [],
	props: [
		{ name: "value", type: "number", required: true },
		{ name: "padStart", type: "boolean", default: "false" },
		{ name: "decimalSeparator", type: "string", default: "\".\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
