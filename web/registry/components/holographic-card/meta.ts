import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "holographic-card",
	title: "Holographic Card",
	description:
		"Card with a holographic sheen that tracks the pointer.",
	interaction:
		"Tilting the pointer across the surface shifts the iridescent highlight.",
	categories: ["Cards"],
	tags: ["spring", "cursor-tracking", "responsive"],
	inspiration: {
		source: "Spark UI",
		url: "https://www.sparkui.site/components/holographic-card",
		authorUrl: "https://www.sparkui.site",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
