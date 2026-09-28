import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "cursor-mask",
	title: "Cursor Mask",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["cursor-tracking", "autoplay"],
	inspiration: {
		source: "auraui.vercel.app",
		url: "https://auraui.vercel.app/component/mask-cursor",
		relationship: "adaptation",
	},
	dependencies: ["motion", "tailwind-merge"],
	registryDependencies: [],
	props: [
		{ name: "hoverColor", type: "string" },
		{ name: "maskColor", type: "string", default: "\"#A5FECB\"" },
		{ name: "className", type: "string" },
		{ name: "hovered", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
