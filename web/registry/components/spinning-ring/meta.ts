import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "spinning-ring",
	title: "Spinning Ring",
	description: "",
	interaction: "",
	categories: ["3D & Canvas"],
	tags: [],
	inspiration: {
		source: "animitives.com",
		url: "https://www.animitives.com/components/perspective",
		relationship: "adaptation",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "'Animated Ring Text '" },
		{ name: "radius", type: "number", default: "80" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
