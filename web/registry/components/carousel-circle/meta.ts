import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "carousel-circle",
	title: "Carousel Circle",
	description:
		"Tilted ring of looping video thumbnails orbiting a phone mockup that plays whichever clip is at the front.",
	interaction:
		"The arrow buttons below turn the ring one slot left or right; it banks into the turn, overshoots and settles, and the phone in the middle crossfades to the clip that arrives at the front.",
	categories: ["Carousels"],
	tags: ["featured", "spring", "hover", "autoplay"],
	inspiration: {
		source: "Serenity UI",
		url: "https://www.serenity-ui.com/components/carousels/carousel360",
		authorUrl: "https://www.serenity-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion", "react-icons"],
	registryDependencies: ["iphone"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 9,
	status: "needs-review",
});
