import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "ascii-converter",
	title: "Ascii Converter",
	description:
		"Two-pane tool that redraws an uploaded image as ASCII art, with controls for detail, character set and colour.",
	interaction:
		"Dropping in or picking an image redraws it as text in the right pane; dragging the detail slider, changing the character set or flipping the invert and colour switches updates the art straight away, and the divider between the panes can be dragged to resize them.",
	categories: ["Utilities"],
	tags: ["canvas", "drag", "hover", "cursor-tracking"],
	inspiration: {
		source: "v0.app",
		url: "https://v0.app/chat/image-to-ascii-pvp9Kq4jLgZ",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react"],
	registryDependencies: ["button", "label", "select", "slider", "switch"],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
