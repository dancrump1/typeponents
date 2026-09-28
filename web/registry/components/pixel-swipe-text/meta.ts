import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "pixel-swipe-text",
	title: "Pixel Swipe Text",
	description: "A pixel-noise stylized dual-band canvas wipe reveal animation for text headlines and hero statements.",
	interaction: "On mount or click, dual cubic-bezier animated sweep bands with dynamic randomized pixel-dithered edges wipe across the text to reveal it with an accent color trail.",
	categories: ["Text Animations"],
	tags: ["canvas", "scroll-driven", "autoplay"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/pixel-swipe-text",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string", default: "\"\"", description: "Additional CSS class names for the container wrapper" },
		{ name: "textClassName", type: "string", default: "\"\"", description: "Additional CSS class names for the inner text element" },
		{ name: "wipeColor", type: "string", default: "\"#46c610ff\"", description: "The color of the primary leading wipe band. Accepts any valid CSS color string." },
		{ name: "trailWipeColor", type: "string", default: "\"#fb7185\"", description: "The color of the secondary trailing wipe band that follows the lead band." },
		{ name: "speed", type: "number", default: "0.7", description: "Animation speed multiplier (lower = faster)" },
		{ name: "playOnce", type: "boolean", default: "true", description: "Whether the animation should only play once when scrolled into view" },
		{ name: "onComplete", type: "(() => void)", description: "Callback fired when the wipe transition animation completes" },
		{ name: "onClick", type: "(() => void)", description: "Optional click handler for the component" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
