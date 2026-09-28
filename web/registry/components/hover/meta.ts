import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hover",
	title: "Hover",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/direction-aware-hover",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "imageUrl", type: "string", required: true },
		{ name: "childrenClassName", type: "string" },
		{ name: "imageClassName", type: "string" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
