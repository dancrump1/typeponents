import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "galaxy-button",
	title: "Galaxy Button",
	description:
		"Pill button filled with a colour gradient, ringed by tiny stars that stream inward past the label.",
	interaction:
		"Hovering speeds the stars up, wraps the button in a coloured glow and makes the label shrink and jitter in place; pressing it sinks the button slightly and deepens the inner glow.",
	categories: ["Buttons"],
	tags: ["hover"],
	inspiration: {
		source: "Eclair UI",
		url: "https://eclairui.gopx.dev/components/buttons/galaxy-button",
		authorUrl: "https://eclairui.gopx.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", required: true },
		{ name: "gradientColors", type: "string[]", required: true },
		{ name: "shimmerColor", type: "string", default: "\"white\"" },
		{ name: "textColor", type: "string", default: "\"white\"" },
		{ name: "fontSize", type: "string", default: "\"1rem\"" },
		{ name: "padding", type: "string", default: "\"0.875rem 2.5rem\"" },
		{ name: "starCount", type: "number", default: "100" },
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "onClick", type: "(() => void)" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
