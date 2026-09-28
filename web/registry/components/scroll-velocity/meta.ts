import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scroll-velocity",
	title: "Scroll Velocity",
	description:
		"Marquee rows of repeating text or logos that slide sideways forever, with the page scroll acting as a throttle.",
	interaction:
		"Each row drifts at a steady pace on its own; scrolling the page pushes it faster, scrolling the other way flips its direction, and it eases back to the base drift once you stop.",
	categories: ["Scroll"],
	tags: ["spring", "scroll-driven", "autoplay", "responsive"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
