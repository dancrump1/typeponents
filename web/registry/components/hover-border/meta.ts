import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hover-border",
	title: "Hover Border",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["hover", "autoplay"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/hover-border-gradient",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "as", type: "React.ElementType<any, keyof React.JSX.IntrinsicElements>" },
		{ name: "containerClassName", type: "string" },
		{ name: "className", type: "string" },
		{ name: "duration", type: "number", default: "1" },
		{ name: "clockwise", type: "boolean", default: "true" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
