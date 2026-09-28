import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "smooth-slider",
	title: "Smooth Slider",
	description: "",
	interaction: "",
	categories: ["Carousels"],
	tags: ["hover"],
	inspiration: {
		source: "aetherui.in",
		url: "https://aetherui.in/docs/smooth-slider#installation",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
