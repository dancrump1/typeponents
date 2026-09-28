import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "peel-reveal",
	title: "Peel Reveal",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["drag", "cursor-tracking"],
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [
		{ name: "imageSrc", type: "string", required: true },
		{ name: "rotate", type: "number", default: "30" },
		{ name: "peelBackHoverPct", type: "number", default: "30" },
		{ name: "peelBackActivePct", type: "number", default: "40" },
		{ name: "peelEasing", type: "string", default: "\"power3.out\"" },
		{ name: "peelHoverEasing", type: "string", default: "\"power2.out\"" },
		{ name: "width", type: "number", default: "200" },
		{ name: "shadowIntensity", type: "number", default: "0.6" },
		{ name: "lightingIntensity", type: "number", default: "0.1" },
		{ name: "initialPosition", type: "\"center\" | \"random\" | { x: number; y: number; }", default: "\"center\"" },
		{ name: "peelDirection", type: "number", default: "0" },
		{ name: "className", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
