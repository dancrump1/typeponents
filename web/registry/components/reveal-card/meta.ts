import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "reveal-card",
	title: "Reveal Card",
	description:
		"Card covered by a full-bleed image that slides away diagonally to expose a title block and a More link.",
	interaction:
		"Hovering slides the image panel down and to the right, uncovering the dark title and description above it and a white More corner beneath; the panel slides back over as soon as the pointer leaves.",
	categories: ["Cards"],
	tags: ["hover"],
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [
		{ name: "imgSrc", type: "string", required: true },
		{ name: "title", type: "string", required: true },
		{ name: "description", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
