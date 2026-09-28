import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "starfield-wrapper",
	title: "Starfield Wrapper",
	description:
		"A wrapper that puts your content over a starfield flying toward the viewer, with pale blue stars streaming out from the centre.",
	interaction:
		"The stars drift on their own, and moving the pointer away from the centre speeds the flight up until the stars stretch into streaks and a soft blue glow blooms behind them. Bringing the pointer back to the middle eases it to a crawl.",
	categories: ["Backgrounds"],
	tags: ["canvas", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "ZenUI",
		url: "https://zenui.net/animations/background-animations",
		authorUrl: "https://zenui.net",
		relationship: "adaptation",
	},
	dependencies: ["react-icons"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
