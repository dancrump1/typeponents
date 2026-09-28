import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "glowing-background",
	title: "Glowing Background",
	description:
		"Dark card topped with a grid of tiny dots that light up like stars, above a title and description.",
	interaction:
		"Left alone, a handful of dots flare white with a blue halo every few seconds and fade back. Hovering the card lights the whole grid, the glow rippling across the dots in sequence.",
	categories: ["Backgrounds"],
	tags: ["hover", "autoplay"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/glowing-stars-effect",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
