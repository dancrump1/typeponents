import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fullscreen-image",
	title: "Fullscreen Image",
	description: "",
	interaction: "",
	categories: ["Images"],
	tags: [],
	inspiration: {
		source: "Kibo UI",
		url: "https://www.kibo-ui.com/components/image-zoom",
		authorUrl: "https://www.kibo-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["react-medium-image-zoom"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
