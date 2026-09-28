import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "spinner",
	title: "Spinner",
	description: "",
	interaction: "",
	categories: ["Loaders"],
	tags: [],
	inspiration: {
		source: "Kibo UI",
		url: "https://www.kibo-ui.com/components/spinner",
		authorUrl: "https://www.kibo-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
