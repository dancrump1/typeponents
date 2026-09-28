import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tooltip-cat",
	title: "Tooltip Cat",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects", "Special Effects & FX"],
	tags: ["hover"],
	inspiration: {
		source: "emerald-ui.com",
		url: "https://emerald-ui.com",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "containerClasses", type: "string" },
		{ name: "wrapperClasses", type: "string" },
		{ name: "catClasses", type: "string" },
		{ name: "catGradientClasses", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
