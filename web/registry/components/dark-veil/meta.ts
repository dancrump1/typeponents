import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dark-veil",
	title: "Dark Veil",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["webgl", "canvas", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://reactbits.dev/backgrounds/dark-veil",
		authorUrl: "https://reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["ogl"],
	registryDependencies: [],
	props: [
		{ name: "hueShift", type: "number", default: "0" },
		{ name: "noiseIntensity", type: "number", default: "0" },
		{ name: "scanlineIntensity", type: "number", default: "0" },
		{ name: "speed", type: "number", default: "0.5" },
		{ name: "scanlineFrequency", type: "number", default: "0" },
		{ name: "warpAmount", type: "number", default: "0" },
		{ name: "resolutionScale", type: "number", default: "1" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
