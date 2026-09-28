import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "color-picker",
	title: "Color Picker",
	description:
		"Swatch button that opens a picker panel with a saturation field, a rainbow hue slider, a hex input and preset chips.",
	interaction:
		"Clicking the swatch scales the panel open; clicking in the colour field moves the ring marker and drags on the hue slider recolour everything live, and tapping a preset chip springs it larger and marks it with a tick.",
	categories: ["Utilities"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "Cult UI",
		url: "https://www.cult-ui.com/docs/components/color-picker",
		authorUrl: "https://www.cult-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion", "poline"],
	registryDependencies: ["button", "cards", "input", "label", "popover"],
	props: [
		{ name: "color", type: "string", required: true },
		{ name: "onChange", type: "(color: string) => void", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
