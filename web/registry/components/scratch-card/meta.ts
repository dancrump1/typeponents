import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scratch-card",
	title: "Scratch Card",
	description:
		"Scratch-off card that reveals content underneath.",
	interaction:
		"Drag across the surface to erase the overlay and uncover the prize.",
	categories: ["Cards"],
	tags: ["canvas", "drag", "cursor-tracking", "keyboard", "autoplay", "responsive"],
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "onReveal", type: "(() => void)", description: "Fires once when the cleared area passes revealThreshold" },
		{ name: "onProgress", type: "((progress: number) => void)", description: "Fires with the cleared ratio (0–1) while scratching" },
		{ name: "revealThreshold", type: "number", default: "0.5", description: "Cleared ratio (0–1) that triggers the full reveal. Default 0.5" },
		{ name: "brushSize", type: "number", default: "28", description: "Scratch brush diameter in pixels. Default 28" },
		{ name: "overlayLabel", type: "string", default: "\"Scratch to reveal\"", description: "Text printed on the foil surface" },
		{ name: "overlayColor", type: "string", default: "\"#171717\"", description: "Foil surface color" },
		{ name: "overlayLabelColor", type: "string", default: "\"#737373\"", description: "Foil label color" },
		{ name: "particleColor", type: "string", default: "\"#a3a3a3\"", description: "Dust particle color" },
		{ name: "ariaLabel", type: "string", default: "\"Scratch surface. Press Enter to reve…", description: "Accessible label for the scratch surface" },
		{ name: "revealAnnouncement", type: "string", default: "\"Hidden content revealed\"", description: "Announced to screen readers when the content is revealed" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
