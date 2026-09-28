import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "falling-text",
	title: "Falling Text",
	description: "",
	interaction: "",
	categories: ["Text"],
	tags: ["featured", "spring", "scroll-driven", "hover", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/text-animations/falling-text",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["matter-js"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "\"\"" },
		{ name: "highlightWords", type: "string[]", default: "[]" },
		{ name: "trigger", type: "\"auto\" | \"scroll\" | \"click\" | \"hover\"", default: "\"auto\"" },
		{ name: "backgroundColor", type: "string", default: "\"transparent\"" },
		{ name: "wireframes", type: "boolean", default: "false" },
		{ name: "gravity", type: "number", default: "1" },
		{ name: "mouseConstraintStiffness", type: "number", default: "0.2" },
		{ name: "fontSize", type: "string", default: "\"1rem\"" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 9,
	status: "needs-review",
});
