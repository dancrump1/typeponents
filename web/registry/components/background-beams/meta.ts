import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "background-beams",
	title: "Background Beams",
	description:
		"Backdrop of thin curved lines sweeping diagonally across the frame, each lit by a travelling blue-to-purple glow.",
	interaction:
		"Runs on its own — glints of light crawl along the lines at staggered speeds and restart forever, with no reaction to the pointer.",
	categories: ["Backgrounds"],
	tags: [],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
