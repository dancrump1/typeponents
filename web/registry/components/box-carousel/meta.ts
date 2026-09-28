import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "box-carousel",
	title: "Box Carousel",
	description:
		"Carousel built as a 3D box, with one image or video on each face and the box turning to show the next.",
	interaction:
		"Dragging spins the box on its axis and it settles onto the nearest face when you let go; the previous and next buttons roll it one face at a time, and it can also turn on its own at a set interval.",
	categories: ["Carousels"],
	tags: ["spring", "drag", "cursor-tracking", "keyboard", "autoplay"],
	dependencies: ["lucide-react", "motion"],
	registryDependencies: ["skeleton"],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
