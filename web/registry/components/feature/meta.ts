import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "feature",
	title: "Feature",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["scroll-driven", "hover", "autoplay"],
	dependencies: ["motion"],
	registryDependencies: ["accordion"],
	props: [
		{ name: "data", type: "CardDataProps", required: true },
		{ name: "collapseDelay", type: "number", default: "5000" },
		{ name: "ltr", type: "boolean", default: "false" },
		{ name: "linePosition", type: "\"left\" | \"right\"", default: "\"left\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
