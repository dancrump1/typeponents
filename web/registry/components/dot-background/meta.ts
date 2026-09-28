import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dot-background",
	title: "Dot Background",
	description:
		"Full-width canvas grid of purple and pink dots joined by faint lines, like a soft particle mesh.",
	interaction:
		"The mesh fades in on load, then dots scatter away from the pointer as it passes and drift back to their grid positions once it moves on.",
	categories: ["Backgrounds"],
	tags: ["canvas", "cursor-tracking", "autoplay"],
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
