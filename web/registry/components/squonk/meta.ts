import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "squonk",
	title: "Squonk",
	description: "",
	interaction: "",
	categories: ["Images", "Special Effects & FX"],
	tags: ["autoplay"],
	inspiration: {
		source: "ScrollX UI",
		url: "https://scrollxui.dev/docs/components/squonk",
		authorUrl: "https://scrollxui.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "size", type: "number", default: "96" },
		{ name: "radius", type: "number" },
		{ name: "cycleDuration", type: "number", default: "4000" },
		{ name: "elasticity", type: "number", default: "1" },
		{ name: "bounceHeight", type: "number" },
		{ name: "squashAmount", type: "number" },
		{ name: "stretchAmount", type: "number" },
		{ name: "easing", type: "\"linear\" | \"bounce\" | \"smooth\"", default: "'linear'" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
