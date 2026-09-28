import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fancy-input",
	title: "Fancy Input",
	description: "",
	interaction: "",
	categories: ["Forms & Inputs"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Star UI",
		url: "https://starui.link/docs/components/subscribe",
		authorUrl: "https://starui.link",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
