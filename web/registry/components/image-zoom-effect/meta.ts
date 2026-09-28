import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "image-zoom-effect",
	title: "Image Zoom Effect",
	description: "",
	interaction: "",
	categories: ["Images"],
	tags: ["spring", "drag", "hover", "cursor-tracking", "responsive"],
	inspiration: {
		source: "Animate UI",
		url: "https://animate-ui.com/docs/primitives/effects/image-zoom",
		authorUrl: "https://animate-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "zoomScale", type: "number", default: "3" },
		{ name: "transition", type: "Transition", default: "{ type: 'spring', stiffness: 200, dam…" },
		{ name: "style", type: "React.CSSProperties" },
		{ name: "zoomOnClick", type: "boolean", default: "true" },
		{ name: "zoomOnHover", type: "boolean", default: "true" },
		{ name: "disabled", type: "boolean", default: "false" },
		{ name: "width", type: "Property.Width<string | number>", default: "'100%'" },
		{ name: "height", type: "Property.Height<string | number>", default: "'100%'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
