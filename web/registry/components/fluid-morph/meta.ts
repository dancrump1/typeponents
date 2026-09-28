import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fluid-morph",
	title: "Fluid Morph",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["spring"],
	inspiration: {
		source: "SmoothUI",
		url: "https://www.smoothui.dev/doc/fluid-morph",
		authorUrl: "https://www.smoothui.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
