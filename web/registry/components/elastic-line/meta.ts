import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "elastic-line",
	title: "Elastic Line",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["spring", "autoplay"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/physics/elastic-line",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "isVertical", type: "boolean", default: "false" },
		{ name: "grabThreshold", type: "number", default: "5" },
		{ name: "releaseThreshold", type: "number", default: "100" },
		{ name: "strokeWidth", type: "number", default: "1" },
		{ name: "transition", type: "ValueAnimationTransition<any>", default: "{ type: \"spring\", stiffness: 400, dam…" },
		{ name: "animateInTransition", type: "ValueAnimationTransition<any>", default: "{ duration: 0.3, ease: \"easeInOut\", }" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
