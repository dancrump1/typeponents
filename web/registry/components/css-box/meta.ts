import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "css-box",
	title: "CSS Box",
	description:
		"Six-sided 3D box that holds any content on each face, spun by dragging or snapped to a named side.",
	interaction:
		"Dragging across the box turns it in both directions and it springs to a stop when you let go; asking for a particular face rotates the box around until that side is square to you.",
	categories: ["Carousels", "Images"],
	tags: ["spring", "drag", "cursor-tracking"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
