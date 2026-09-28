import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "globe",
	title: "Globe",
	description:
		"Rotating 3D globe with hexagon-dotted landmasses and coloured arcs flying between pairs of cities.",
	interaction:
		"Spins on its own — arcs draw themselves across the surface and fade, while rings pulse outward from the departure cities every couple of seconds. Dragging turns the globe by hand.",
	categories: ["3D & Canvas"],
	tags: ["webgl", "autoplay"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/github-globe",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["@react-three/drei", "@react-three/fiber", "three", "three-globe"],
	registryDependencies: [],
	props: [
		{ name: "globeConfig", type: "GlobeConfig", required: true },
		{ name: "data", type: "Position[]", required: true },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
