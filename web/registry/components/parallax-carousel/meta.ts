import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "parallax-carousel",
	title: "Parallax Carousel",
	description: "",
	interaction: "",
	categories: ["Carousels"],
	tags: ["spring", "drag", "autoplay"],
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "CarouselItem[]" },
		{ name: "baseWidth", type: "number" },
		{ name: "autoplay", type: "boolean" },
		{ name: "autoplayDelay", type: "number" },
		{ name: "pauseOnHover", type: "boolean" },
		{ name: "loop", type: "boolean" },
		{ name: "round", type: "boolean" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
