import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "snowflakes",
	title: "Snowflakes",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["webgl", "cursor-tracking"],
	dependencies: ["three"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
