import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "cursor-carousel",
	title: "Cursor Carousel",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["spring", "cursor-tracking"],
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "images", type: "CursorCarouselImage[]", default: "DEFAULT_IMAGES" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
