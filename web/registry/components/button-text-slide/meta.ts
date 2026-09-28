import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "button-text-slide",
	title: "Button Text Slide",
	description:
		"Solid or outlined link button whose label swaps for a second line of text on hover.",
	interaction:
		"The button slides in from the right and fades up on load; hovering it pushes the current label up out of view while the replacement text rises into its place from below.",
	categories: ["Buttons"],
	tags: ["hover"],
	inspiration: {
		source: "Kokonut UI",
		url: "https://kokonutui.com",
		authorUrl: "https://kokonutui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "\"Browse Components\"" },
		{ name: "hoverText", type: "string" },
		{ name: "href", type: "string", default: "\"/docs/components/liquid-glass-card\"" },
		{ name: "className", type: "string" },
		{ name: "variant", type: "\"default\" | \"ghost\"", default: "\"default\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
