import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "ghost-svg",
	title: "Ghost SVG",
	description:
		"Ghost-shaped silhouette filled with a churning yellow blob, with two tall eyes that watch the pointer.",
	interaction:
		"Bobs up and down in a slow loop while the fill inside churns and shifts. The eyes follow the pointer around the page and blink every few seconds.",
	categories: ["Images"],
	tags: ["webgl", "spring", "cursor-tracking"],
	inspiration: {
		source: "UI Layouts",
		url: "https://www.ui-layouts.com/components/mesh-gradients",
		authorUrl: "https://www.ui-layouts.com",
		relationship: "adaptation",
	},
	dependencies: ["@react-three/fiber", "framer-motion", "three"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
