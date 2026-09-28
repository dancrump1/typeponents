import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "cursor-follow",
	title: "Cursor Follow",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["spring", "hover", "cursor-tracking"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
