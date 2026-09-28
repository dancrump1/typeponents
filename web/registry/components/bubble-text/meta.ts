import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "bubble-text",
	title: "Bubble Text",
	description:
		"Oversized thin heading whose letters thicken and brighten under the pointer.",
	interaction:
		"Hovering a letter swells it to its heaviest weight and lightens its colour, with the two letters either side thickening partway, so a soft bulge follows the pointer along the word.",
	categories: ["Text"],
	tags: [],
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
