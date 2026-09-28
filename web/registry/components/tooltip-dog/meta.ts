import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tooltip-dog",
	title: "Tooltip Dog",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects", "Special Effects & FX"],
	tags: ["hover"],
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "containerClasses", type: "string" },
		{ name: "wrapperClasses", type: "string" },
		{ name: "dogClasses", type: "string" },
		{ name: "dogGradientClasses", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
