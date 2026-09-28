import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "attractor",
	title: "Attractor",
	description:
		"Physics field where the elements you drop in are pulled toward a fixed point and pushed away by the cursor.",
	interaction:
		"The elements fall in and clump around the attractor point on load, then scatter as the pointer sweeps through them and drift back once it moves away; individual ones can be picked up and flung by dragging.",
	categories: ["3D & Canvas"],
	tags: ["autoplay"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/physics/gravity",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["lodash", "matter-js", "poly-decomp"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
