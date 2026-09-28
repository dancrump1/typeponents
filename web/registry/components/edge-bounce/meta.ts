import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "edge-bounce",
	title: "Edge Bounce",
	description:
		"Wrapper that makes whatever sits inside it flinch away from the cursor the moment the pointer touches it.",
	interaction:
		"When the pointer crosses into the element it darts away from the entry point and tilts in the direction you were moving, further the faster you approached, then springs back to its resting place.",
	categories: ["Cursor & Pointer Effects"],
	tags: ["spring", "cursor-tracking"],
	inspiration: {
		source: "Atelier UI",
		url: "https://www.atelier-ui.com/en/docs/components/cursor/edge-bounce",
		authorUrl: "https://www.atelier-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "pause", type: "number", default: "0" },
		{ name: "outDuration", type: "number", default: "0.35" },
		{ name: "inDuration", type: "number", default: "1" },
		{ name: "bounce", type: "number", default: "0.3" },
		{ name: "distance", type: "number", default: "35" },
		{ name: "rotation", type: "number", default: "25" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
