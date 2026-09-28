import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "spotlight",
	title: "Spotlight",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["spring", "cursor-tracking"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "size", type: "number", default: "200" },
		{ name: "springOptions", type: "SpringOptions", default: "{ bounce: 0 }" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	notes: "2 demos: demo.tsx, demo-spotlightborder.tsx.",
});
