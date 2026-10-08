import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "process-card-reveal",
	title: "Process Card Reveal",
	description: "Numbered steps on a timeline whose connector fills before the next card slides and blurs into place — image one way, copy the other. Hover pauses the loop; clicking a step jumps there.",
	interaction: "Numbered steps sit on a timeline that fills before the next card slides and blurs into place. Hover pauses the loop. Clicking a step jumps there.",
	categories: ["Cards"],
	tags: ["hover", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/process-card-reveal",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "steps", type: "ProcessStep[]", default: "DEFAULT_STEPS", description: "Process steps shown in the stacked cards. Defaults to a 4-step sample." },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
