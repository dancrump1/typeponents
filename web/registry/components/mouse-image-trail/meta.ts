import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "mouse-image-trail",
	title: "Mouse Image Trail",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["spring", "cursor-tracking"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "images", type: "string[]", required: true },
		{ name: "renderImageBuffer", type: "number", required: true },
		{ name: "rotationRange", type: "number", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
