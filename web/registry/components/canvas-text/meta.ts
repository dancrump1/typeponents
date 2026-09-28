import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "canvas-text",
	title: "Canvas Text",
	description:
		"Heading drawn on a canvas so its letterforms are filled with stacked coloured lines instead of solid colour.",
	interaction:
		"Runs on its own — the lines inside the letters bow up and down in a slow repeating wave, and nothing changes when you hover or click.",
	categories: ["Text Animations"],
	tags: ["canvas", "autoplay", "responsive"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/canvas-text",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", required: true },
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "backgroundClassName", type: "string", default: "\"bg-white dark:bg-neutral-950\"" },
		{ name: "colors", type: "string[]", default: "[\"#ff6b6b\", \"#4ecdc4\", \"#45b7d1\", \"#9…" },
		{ name: "animationDuration", type: "number", default: "5" },
		{ name: "lineWidth", type: "number", default: "1.5" },
		{ name: "lineGap", type: "number", default: "10" },
		{ name: "curveIntensity", type: "number", default: "60" },
		{ name: "overlay", type: "boolean", default: "false" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
