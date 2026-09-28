import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "grid-distortion",
	title: "Grid Distortion",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["webgl", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/backgrounds/grid-distortion",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["three"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	notes: "2 demos: demo.tsx, demo-griddistortionbackground.tsx.",
});
