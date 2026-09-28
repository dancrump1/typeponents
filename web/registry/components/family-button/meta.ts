import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "family-button",
	title: "Family Button",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Cult UI",
		url: "https://www.cult-ui.com/docs/components/family-button",
		authorUrl: "https://www.cult-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion", "react-use-measure"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
