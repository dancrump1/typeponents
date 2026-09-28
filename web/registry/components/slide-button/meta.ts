import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "slide-button",
	title: "Slide Button",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["spring", "drag"],
	inspiration: {
		source: "skiper-ui.com",
		url: "https://skiper-ui.com/docs/components/slide-button",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion", "uuid"],
	registryDependencies: ["button"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
