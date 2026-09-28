import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "aurora-background",
	title: "Aurora Background",
	description: "Full-bleed backdrop of soft banded aurora light behind whatever you put in it.",
	interaction:
		"Runs on its own — the bands of colour drift slowly across the frame in an endless loop and do not react to the pointer.",
	categories: ["Backgrounds", "Special Effects & FX"],
	tags: [],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "showRadialGradient", type: "boolean", default: "true" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
