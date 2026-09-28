import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "status-indicator",
	title: "Status Indicator",
	description:
		"A coloured status dot with an optional label, in green, red, yellow or grey for active, down, fixing and idle.",
	interaction:
		"Runs on its own — every state except idle sends a matching halo pulsing outward from the dot in a slow repeating loop, and nothing responds to the pointer.",
	categories: ["Special Effects & FX"],
	tags: [],
	inspiration: {
		source: "ui.8starlabs.com",
		url: "https://ui.8starlabs.com/docs/components/status-indicator",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "state", type: "\"active\" | \"down\" | \"fixing\" | \"idle\"", default: "\"idle\"" },
		{ name: "color", type: "string" },
		{ name: "label", type: "string" },
		{ name: "className", type: "string" },
		{ name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
		{ name: "labelClassName", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
