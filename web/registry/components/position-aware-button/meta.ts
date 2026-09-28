import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "position-aware-button",
	title: "Position Aware Button",
	description:
		"Solid pill button that fills with a dark circle growing from wherever the pointer touched it.",
	interaction:
		"Hovering grows a black circle out of the exact spot the pointer entered until it covers the button; moving away shrinks it back toward the point where you left.",
	categories: ["Buttons"],
	tags: ["cursor-tracking"],
	inspiration: {
		source: "Namer UI",
		url: "https://namer-ui.netlify.app/components",
		authorUrl: "https://namer-ui.netlify.app",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "buttonText", type: "string", required: true },
		{ name: "buttonWidth", type: "string", default: "\"auto\"" },
		{ name: "borderRadius", type: "string", default: "\"2em\"" },
		{ name: "buttonColor", type: "string", default: "\"#ff4500\"" },
		{ name: "onClick", type: "((event: React.MouseEvent<HTMLButtonElement>) => void)" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
