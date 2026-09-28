import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "cpu-architecture",
	title: "Cpu Architecture",
	description:
		"Line-drawn circuit diagram of a CPU chip with traces fanning out to labelled pins around it.",
	interaction:
		"Runs on its own — glowing dots travel outward along the circuit traces on staggered loops while the chip label cycles through gradient colours, and nothing reacts to the pointer.",
	categories: ["Backgrounds"],
	tags: [],
	inspiration: {
		source: "gammaui.com",
		url: "https://www.gammaui.com/docs/components/cpu-architecture",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "width", type: "string", default: "\"100%\"" },
		{ name: "height", type: "string", default: "\"100%\"" },
		{ name: "text", type: "string", default: "\"CPU\"" },
		{ name: "showCpuConnections", type: "boolean", default: "true" },
		{ name: "lineMarkerSize", type: "number", default: "18" },
		{ name: "animateText", type: "boolean", default: "true" },
		{ name: "animateLines", type: "boolean", default: "true" },
		{ name: "animateMarkers", type: "boolean", default: "true" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
