import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "infinite-carousel",
	title: "Infinite Carousel",
	description: "",
	interaction: "",
	categories: ["Carousels"],
	tags: ["spring", "autoplay"],
	inspiration: {
		source: "pldkhoa",
		url: "https://www.pldkhoa.dev/playground/infinite-carousel",
		authorUrl: "https://www.pldkhoa.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
