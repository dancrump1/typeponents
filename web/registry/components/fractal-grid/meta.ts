import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fractal-grid",
	title: "Fractal Grid",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["canvas", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "Cult UI",
		url: "https://www.cult-ui.com/docs/components/bg-animated-fractal-grid",
		authorUrl: "https://www.cult-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "dotSize", type: "number", default: "4", description: "Size of each dot in pixels" },
		{ name: "dotSpacing", type: "number", default: "20", description: "Spacing between dots in pixels" },
		{ name: "dotOpacity", type: "number", default: "0.3", description: "Opacity of dots (0-1)" },
		{ name: "waveIntensity", type: "number", default: "30", description: "Intensity of the wave effect when hovering" },
		{ name: "waveRadius", type: "number", default: "200", description: "Radius of the wave effect in pixels" },
		{ name: "dotColor", type: "string", default: "\"rgba(100, 100, 255, 1)\"", description: "Color of the dots (supports any valid CSS color)" },
		{ name: "glowColor", type: "string", default: "\"rgba(100, 100, 255, 1)\"", description: "Color of the dot glow effect (supports any valid CSS color)" },
		{ name: "enableNoise", type: "boolean", default: "true", description: "Enable or disable the noise overlay" },
		{ name: "noiseOpacity", type: "number", default: "0.03", description: "Opacity of the noise overlay (0-1)" },
		{ name: "enableMouseGlow", type: "boolean", default: "true", description: "Enable or disable the mouse glow effect" },
		{ name: "initialPerformance", type: "\"low\" | \"medium\" | \"high\"", default: "\"medium\"", description: "Set the initial performance level" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
