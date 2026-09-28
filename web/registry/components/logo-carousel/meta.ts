import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "logo-carousel",
	title: "Logo Carousel",
	description: "",
	interaction: "",
	categories: ["Carousels"],
	tags: ["spring", "autoplay"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "columnCount", type: "number", default: "2" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
