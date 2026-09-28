import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tracing-beam",
	title: "Tracing Beam",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["featured", "spring", "scroll-driven"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 9,
	status: "needs-review",
});
