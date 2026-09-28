import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "takeover-links",
	title: "Takeover Links",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["hover"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "active", type: "number | null", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
