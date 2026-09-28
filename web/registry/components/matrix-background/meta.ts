import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "matrix-background",
	title: "Matrix Background",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["canvas", "autoplay"],
	inspiration: {
		source: "Eclair UI",
		url: "https://eclairui.gopx.dev/components/backgrounds/matrix",
		authorUrl: "https://eclairui.gopx.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "color", type: "string", default: "\"#0F0\"" },
		{ name: "fontSize", type: "number", default: "14" },
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "speed", type: "number", default: "1" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
