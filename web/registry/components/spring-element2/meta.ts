import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "spring-element2",
	title: "Spring Element 2",
	description:
		"Contained spring that you pull from an anchor; the coil stretches with the drag and snaps back on release.",
	interaction:
		"Grab the child and drag it away from its anchor. The SVG coil follows the motion with spring physics and fires onPullEnd when you let go.",
	categories: ["Special Effects & FX"],
	tags: ["spring", "drag", "autoplay", "responsive"],
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
