import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "power-off-slide",
	title: "Power Off Slide",
	description:
		"Slide-to-power-off track with a draggable knob carrying a red power icon and a shimmering label.",
	interaction:
		"Drag the knob to the far right and the track is replaced by a shutting-down message before resetting itself; release short of the end and the knob snaps back. The label text shimmers in a continuous loop.",
	categories: ["Buttons"],
	tags: ["drag", "autoplay"],
	inspiration: {
		source: "SmoothUI",
		url: "https://www.smoothui.dev/doc/power-off-slide",
		authorUrl: "https://www.smoothui.dev",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
