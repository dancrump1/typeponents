import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "line-background",
	title: "Line Background",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: [],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/google-gemini-effect",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "pathLengths", type: "MotionValue<any>[]", required: true },
		{ name: "title", type: "string" },
		{ name: "description", type: "string" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
