import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "meteors",
	title: "Meteors",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: [],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/meteors",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "number", type: "number" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
