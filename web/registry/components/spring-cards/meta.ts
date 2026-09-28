import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "spring-cards",
	title: "Spring Cards",
	description: "",
	interaction: "",
	categories: ["Modals"],
	tags: ["spring", "hover"],
	dependencies: ["motion", "react-icons", "tailwind-merge"],
	registryDependencies: [],
	props: [
		{ name: "title", type: "string", required: true },
		{ name: "subtitle", type: "string", required: true },
		{ name: "className", type: "string" },
		{ name: "containerClassName", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
