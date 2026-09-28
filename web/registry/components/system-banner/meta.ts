import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "system-banner",
	title: "System Banner",
	description: "",
	interaction: "",
	categories: ["Utilities"],
	tags: [],
	inspiration: {
		source: "ui.8starlabs.com",
		url: "https://ui.8starlabs.com/docs/components/system-banner",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "\"Development Mode\"" },
		{ name: "color", type: "string", default: "\"bg-orange-500\"" },
		{ name: "size", type: "\"xs\" | \"sm\" | \"md\" | \"lg\"", default: "\"xs\"" },
		{ name: "show", type: "boolean", default: "true" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
