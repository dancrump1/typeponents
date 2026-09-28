import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "goomorphic-card",
	title: "Goomorphic Card",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["hover"],
	inspiration: {
		source: "react-motion-components.vercel.app",
		url: "https://react-motion-components.vercel.app/?path=/docs/components-cards-goomorphic-card--docs&globals=outline:!true",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "location", type: "string", required: true },
		{ name: "device", type: "string", required: true },
		{ name: "name", type: "string", required: true },
		{ name: "user", type: "string", required: true },
		{ name: "url", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
