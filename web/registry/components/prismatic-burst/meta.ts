import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "prismatic-burst",
	title: "Prismatic Burst",
	description:
		"Full-bleed burst of prismatic light rays radiating from a centre point through a colour ramp you choose.",
	interaction:
		"Runs on its own — the rays sweep and turn in a continuous loop. Set to hover mode, the origin of the burst follows the pointer, drifting toward it rather than snapping.",
	categories: ["Backgrounds"],
	tags: ["webgl", "scroll-driven", "hover", "cursor-tracking", "autoplay", "responsive"],
	dependencies: ["ogl"],
	registryDependencies: [],
	props: [
		{ name: "intensity", type: "number", default: "2" },
		{ name: "speed", type: "number", default: "0.5" },
		{ name: "animationType", type: "AnimationType", default: "\"rotate3d\"" },
		{ name: "colors", type: "string[]" },
		{ name: "distort", type: "number", default: "0" },
		{ name: "paused", type: "boolean", default: "false" },
		{ name: "offset", type: "Offset", default: "{ x: 0, y: 0 }" },
		{ name: "hoverDampness", type: "number", default: "0" },
		{ name: "rayCount", type: "number" },
		{ name: "mixBlendMode", type: "Property.MixBlendMode | \"none\"", default: "\"lighten\"" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
