import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "pin",
	title: "Pin",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["hover"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/3d-pin",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "title", type: "string" },
		{ name: "href", type: "string" },
		{ name: "className", type: "string" },
		{ name: "containerClassName", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
