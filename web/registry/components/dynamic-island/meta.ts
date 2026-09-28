import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dynamic-island",
	title: "Dynamic Island",
	description:
		"Black pill notch that reshapes itself between a compact weather badge, an incoming call banner and a countdown timer.",
	interaction:
		"Clicking one of the three buttons below morphs the pill to that size, with the old contents blurring out as the new ones scale in and the pill overshooting slightly before it settles. Hovering the idle pill widens it to reveal the temperature.",
	categories: ["Buttons"],
	tags: ["spring", "hover", "autoplay"],
	inspiration: {
		source: "SmoothUI",
		url: "https://www.smoothui.dev/doc/dynamic-island",
		authorUrl: "https://www.smoothui.dev",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
