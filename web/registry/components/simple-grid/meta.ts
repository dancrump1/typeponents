import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "simple-grid",
	title: "Simple Grid",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	inspiration: {
		source: "Eclair UI",
		url: "https://eclairui.gopx.dev/components/grids/gopx-bento-grid",
		authorUrl: "https://eclairui.gopx.dev",
		relationship: "adaptation",
	},
	dependencies: ["clsx", "motion", "react-icons"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
