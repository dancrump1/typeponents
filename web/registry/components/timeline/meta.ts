import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "timeline",
	title: "Timeline",
	description:
		"Vertical timeline of dated events.",
	interaction:
		"Scroll through stacked events; each node marks a point in time.",
	categories: ["Data & Tables"],
	tags: ["scroll-driven"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "data", type: "TimelineEntry[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
