import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "mask-effect",
	title: "Mask Effect",
	description: "",
	interaction: "",
	categories: ["Images", "Cursor & Pointer Effects"],
	tags: ["hover", "cursor-tracking"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "revealText", type: "React.ReactNode" },
		{ name: "size", type: "number", default: "10" },
		{ name: "revealSize", type: "number", default: "600" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
