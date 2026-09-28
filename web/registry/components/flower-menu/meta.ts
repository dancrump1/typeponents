import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "flower-menu",
	title: "Flower Menu",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["hover"],
	inspiration: {
		source: "animata.design",
		url: "https://animata.design/docs/list/flower-menu",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "menuItems", type: "MenuItem[]", required: true },
		{ name: "iconColor", type: "string", default: "\"white\"" },
		{ name: "backgroundColor", type: "string", default: "\"rgba(255, 255, 255, 0.2)\"" },
		{ name: "animationDuration", type: "number", default: "500" },
		{ name: "togglerSize", type: "number", default: "40" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
