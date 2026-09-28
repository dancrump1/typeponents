import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "movie-gallery",
	title: "Movie Gallery",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "pro.bossadizenith.me",
		url: "https://pro.bossadizenith.me/",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
