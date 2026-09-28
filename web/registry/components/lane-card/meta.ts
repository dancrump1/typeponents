import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "lane-card",
	title: "Lane Card",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["hover"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
