import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "color-change-cards",
	title: "Color Change Cards",
	description:
		"Grid of photo tiles that sit desaturated behind a heading, a caption and a corner arrow.",
	interaction:
		"Hovering a tile brings its photo back to full colour and zooms it in, swings the corner arrow up to a diagonal, and rolls the heading letters upward one after another to a matching copy underneath.",
	categories: ["Cards"],
	tags: ["hover"],
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
