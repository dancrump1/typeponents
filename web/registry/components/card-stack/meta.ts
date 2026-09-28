import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "card-stack",
	title: "Card Stack",
	description:
		"Stack of testimonial cards with the ones behind peeking out above, slightly smaller each step back.",
	interaction:
		"Runs on its own — every few seconds the back card slides up to the front and the rest shuffle down a place, cycling through the quotes without any input.",
	categories: ["Cards"],
	tags: ["autoplay"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/card-stack",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
