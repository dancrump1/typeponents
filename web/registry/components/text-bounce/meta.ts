import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-bounce",
	title: "Text Bounce",
	description: "Heading whose individual letters shy away from the pointer and spring back.",
	interaction:
		"Moving the pointer across the text pushes each letter it touches away from the cursor with a slight tilt; the letter then springs back to its place with a soft overshoot.",
	categories: ["Text Animations", "Cursor & Pointer Effects"],
	tags: ["spring", "cursor-tracking"],
	inspiration: {
		source: "Atelier UI",
		url: "https://www.atelier-ui.com/en/docs/components/text/text-bounce",
		authorUrl: "https://www.atelier-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["text-split2"],
	props: [
		{ name: "pause", type: "number", default: "0" },
		{ name: "outDuration", type: "number", default: "0.35" },
		{ name: "inDuration", type: "number", default: "0.8" },
		{ name: "bounce", type: "number", default: "0.5" },
		{ name: "distance", type: "number", default: "35" },
		{ name: "rotation", type: "number", default: "25" },
		{ name: "render", type: "RenderProp" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
