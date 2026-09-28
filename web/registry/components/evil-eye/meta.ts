import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "evil-eye",
	title: "Evil Eye",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["webgl", "cursor-tracking", "autoplay"],
	dependencies: ["ogl"],
	registryDependencies: [],
	props: [
		{ name: "eyeColor", type: "string", default: "'#FF6F37'" },
		{ name: "intensity", type: "number", default: "1.5" },
		{ name: "pupilSize", type: "number", default: "0.6" },
		{ name: "irisWidth", type: "number", default: "0.25" },
		{ name: "glowIntensity", type: "number", default: "0.35" },
		{ name: "scale", type: "number", default: "0.8" },
		{ name: "noiseScale", type: "number", default: "1.0" },
		{ name: "pupilFollow", type: "number", default: "1.0" },
		{ name: "flameSpeed", type: "number", default: "1.0" },
		{ name: "backgroundColor", type: "string", default: "'#000000'" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
