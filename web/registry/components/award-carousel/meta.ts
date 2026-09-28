import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "award-carousel",
	title: "Award Carousel",
	description: "Row of laurel-wreath award badges above the matching quote and a row of dots.",
	interaction:
		"Hovering a badge brings it to full strength and dims the others, then steps the quote underneath across to that award one item at a time, with the dots sliding along to match.",
	categories: ["Carousels"],
	tags: ["spring", "hover", "autoplay"],
	inspiration: {
		source: "ui.noxhd.com",
		url: "https://ui.noxhd.com/components/awards-carousel/",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
