import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "performant-sidebar",
	title: "Performant Sidebar",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: [],
	inspiration: {
		source: "joshuawootonn.com",
		url: "https://www.joshuawootonn.com/react-treeview-component",
		relationship: "adaptation",
	},
	dependencies: ["clsx", "is-hotkey", "lodash.clamp", "motion", "uuid"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
