import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-split",
	title: "Text Split",
	description: "",
	interaction: "",
	categories: ["Text", "Text Animations"],
	tags: ["hover"],
	inspiration: {
		source: "berlix.vercel.app",
		url: "https://berlix.vercel.app/docs/text-split",
		relationship: "adaptation",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "topClassName", type: "string" },
		{ name: "bottomClassName", type: "string" },
		{ name: "maxMove", type: "number", default: "50" },
		{ name: "falloff", type: "number", default: "0.3" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
