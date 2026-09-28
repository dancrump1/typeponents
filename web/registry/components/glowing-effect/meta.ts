import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "glowing-effect",
	title: "Glowing Effect",
	description:
		"Multicoloured glow that traces the border of whatever card or panel it is dropped into.",
	interaction:
		"As the pointer approaches the element, a bright arc fades in along the border and swings around to face the cursor, trailing it as it moves. It fades out when the pointer drifts away or settles in the middle.",
	categories: ["Special Effects & FX"],
	tags: ["autoplay"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/glowing-effect",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
