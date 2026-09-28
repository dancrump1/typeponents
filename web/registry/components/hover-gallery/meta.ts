import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hover-gallery",
	title: "Hover Gallery",
	description: "",
	interaction: "",
	categories: ["Media Galleries"],
	tags: ["hover"],
	inspiration: {
		source: "Star UI",
		url: "https://starui.link/docs/components/hover-gallery",
		authorUrl: "https://starui.link",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
