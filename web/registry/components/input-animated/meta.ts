import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "input-animated",
	title: "Input Animated",
	description: "",
	interaction: "",
	categories: ["Forms & Inputs"],
	tags: ["spring"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "label", type: "string", required: true },
		{ name: "value", type: "string", required: true },
		{ name: "className", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
