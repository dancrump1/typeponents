import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "navbar2",
	title: "Navbar2",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["hover"],
	inspiration: {
		source: "wind-ui.com",
		url: "https://wind-ui.com/components/navbars/",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: ["mode-toggle"],
	props: [
		{ name: "routes", type: "any[]", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
