import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "galaxy",
	title: "Galaxy",
	description:
		"Full-bleed starfield background of layered, twinkling stars set in a slowly rotating galaxy.",
	interaction:
		"Runs on its own — the star layers drift and rotate while individual stars twinkle. Moving the pointer across it pushes nearby stars outward, and they ease back once the pointer leaves.",
	categories: ["Backgrounds"],
	tags: ["webgl", "cursor-tracking", "autoplay"],
	dependencies: ["ogl"],
	registryDependencies: [],
	props: [
		{ name: "focal", type: "[number, number]", default: "[0.5, 0.5]" },
		{ name: "rotation", type: "[number, number]", default: "[1.0, 0.0]" },
		{ name: "starSpeed", type: "number", default: "0.5" },
		{ name: "density", type: "number", default: "1" },
		{ name: "hueShift", type: "number", default: "140" },
		{ name: "disableAnimation", type: "boolean", default: "false" },
		{ name: "speed", type: "number", default: "1.0" },
		{ name: "mouseInteraction", type: "boolean", default: "true" },
		{ name: "glowIntensity", type: "number", default: "0.3" },
		{ name: "saturation", type: "number", default: "0.0" },
		{ name: "mouseRepulsion", type: "boolean", default: "true" },
		{ name: "twinkleIntensity", type: "number", default: "0.3" },
		{ name: "rotationSpeed", type: "number", default: "0.1" },
		{ name: "repulsionStrength", type: "number", default: "2" },
		{ name: "autoCenterRepulsion", type: "number", default: "0" },
		{ name: "transparent", type: "boolean", default: "true" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
