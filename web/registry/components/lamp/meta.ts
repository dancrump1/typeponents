import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "lamp",
	title: "Lamp",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: [],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/lamp-effect",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["sparkles"],
	props: [
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
