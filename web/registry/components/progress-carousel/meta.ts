import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "progress-carousel",
	title: "Progress Carousel",
	description:
		"Image carousel with captioned tab buttons across the bottom, each filling with a progress bar while its slide is showing.",
	interaction:
		"Slides advance on their own as the active tab's bar fills; clicking another tab rushes the current bar to the end, then cross-fades to that slide and restarts the timer.",
	categories: ["Carousels"],
	tags: ["autoplay"],
	inspiration: {
		source: "UI Layouts",
		url: "https://www.ui-layouts.com/components/progressive-carousel",
		authorUrl: "https://www.ui-layouts.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
