import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "flip-card",
	title: "Flip Card",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "berlix.vercel.app",
		url: "https://berlix.vercel.app/docs/flip-card",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "front", type: "ReactNode", required: true },
		{ name: "back", type: "ReactNode", required: true },
		{ name: "duration", type: "number", default: "0.3" },
		{ name: "flipDirection", type: "\"horizontal\" | \"vertical\"", default: "\"horizontal\"" },
		{ name: "flipRotation", type: "\"forward\" | \"reverse\"", default: "\"forward\"" },
		{ name: "className", type: "string" },
		{ name: "panelClassName", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
