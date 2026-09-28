import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-morph",
	title: "Text Morph",
	description: "",
	interaction: "",
	categories: ["Text", "Text Animations"],
	tags: ["spring"],
	inspiration: {
		source: "Motion Primitives",
		url: "https://motion-primitives.com/docs/text-morph",
		authorUrl: "https://motion-primitives.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "as", type: "ElementType<any, keyof JSX.IntrinsicElements>" },
		{ name: "className", type: "string" },
		{ name: "style", type: "CSSProperties" },
		{ name: "variants", type: "Variants" },
		{ name: "transition", type: "Transition" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
