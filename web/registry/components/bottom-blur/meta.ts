import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "bottom-blur",
	title: "Bottom Blur",
	description:
		"Strip pinned across the bottom of the viewport that blurs whatever passes behind it, in steps from clear to heavy.",
	interaction:
		"Static — the strip sits over the bottom of the screen at all times, so content softens and disappears into it as you scroll rather than cutting off at an edge.",
	categories: ["Special Effects & FX"],
	tags: [],
	inspiration: {
		source: "cuicui.day",
		url: "https://cuicui.day/other/creative-effects",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
