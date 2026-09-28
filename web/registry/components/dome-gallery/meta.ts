import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dome-gallery",
	title: "Dome Gallery",
	description:
		"Photo grid wrapped onto the inside of a dome, so tiles curve away and shrink toward the edges of the frame.",
	interaction:
		"Dragging spins the dome left, right and slightly up or down, and it keeps coasting after you let go before settling. Clicking a tile lifts that photo off the curve and enlarges it flat in the centre; clicking again drops it back into its slot.",
	categories: ["Media Galleries"],
	tags: ["drag", "cursor-tracking", "keyboard", "autoplay", "responsive"],
	dependencies: ["@use-gesture/react"],
	registryDependencies: [],
	props: [
		{ name: "images", type: "ImageItem[]", default: "DEFAULT_IMAGES" },
		{ name: "fit", type: "number", default: "0.5" },
		{ name: "fitBasis", type: "\"auto\" | \"min\" | \"max\" | \"width\" | \"height\"", default: "\"auto\"" },
		{ name: "minRadius", type: "number", default: "600" },
		{ name: "maxRadius", type: "number", default: "Infinity" },
		{ name: "padFactor", type: "number", default: "0.25" },
		{ name: "overlayBlurColor", type: "string", default: "\"#060010\"" },
		{ name: "maxVerticalRotationDeg", type: "number", default: "DEFAULTS.maxVerticalRotationDeg" },
		{ name: "dragSensitivity", type: "number", default: "DEFAULTS.dragSensitivity" },
		{ name: "enlargeTransitionMs", type: "number", default: "DEFAULTS.enlargeTransitionMs" },
		{ name: "segments", type: "number", default: "DEFAULTS.segments" },
		{ name: "dragDampening", type: "number", default: "2" },
		{ name: "openedImageWidth", type: "string", default: "\"400px\"" },
		{ name: "openedImageHeight", type: "string", default: "\"400px\"" },
		{ name: "imageBorderRadius", type: "string", default: "\"30px\"" },
		{ name: "openedImageBorderRadius", type: "string", default: "\"30px\"" },
		{ name: "grayscale", type: "boolean", default: "true" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
