import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "sparkles",
	title: "Sparkles",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: [],
	dependencies: ["@tsparticles/engine", "@tsparticles/react", "@tsparticles/slim", "motion"],
	registryDependencies: [],
	props: [
		{ name: "id", type: "string" },
		{ name: "className", type: "string" },
		{ name: "background", type: "string" },
		{ name: "particleSize", type: "number" },
		{ name: "minSize", type: "number" },
		{ name: "maxSize", type: "number" },
		{ name: "speed", type: "number" },
		{ name: "particleColor", type: "string" },
		{ name: "particleDensity", type: "number" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
