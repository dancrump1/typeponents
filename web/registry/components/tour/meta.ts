import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tour",
	title: "Tour",
	description: "",
	interaction: "",
	categories: ["Utilities"],
	tags: [],
	inspiration: {
		source: "nyxbui.design",
		url: "https://nyxbui.design/docs/components/tour",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
