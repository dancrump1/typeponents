import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "select-modal",
	title: "Select Modal",
	description: "",
	interaction: "",
	categories: ["Forms & Inputs"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Star UI",
		url: "https://starui.link/docs/components/select-model",
		authorUrl: "https://starui.link",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["select"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
