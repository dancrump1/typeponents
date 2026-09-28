import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-hover",
	title: "Text Hover",
	description:
		"Large outlined headline that only shows its rainbow gradient inside a soft circle around the pointer.",
	interaction:
		"The word sits invisible until you move onto it, then a round spotlight follows the pointer and paints the letter outlines it passes over in yellow, red, blue, cyan and violet; the colour fades again as the pointer moves on.",
	categories: ["Text"],
	tags: ["hover", "cursor-tracking"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", required: true },
		{ name: "duration", type: "number" },
		{ name: "automatic", type: "boolean" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
