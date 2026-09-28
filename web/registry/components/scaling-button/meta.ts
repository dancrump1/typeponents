import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scaling-button",
	title: "Scaling Button",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["spring", "hover"],
	dependencies: ["motion"],
	registryDependencies: ["button"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
