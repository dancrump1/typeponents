import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "spring-element",
	title: "Spring Element",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["spring", "drag"],
	inspiration: {
		source: "Animate UI",
		url: "https://animate-ui.com/docs/components/spring-element",
		authorUrl: "https://animate-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "springClassName", type: "string" },
		{ name: "dragElastic", type: "(number & DragElastic)", default: "0.2" },
		{ name: "springConfig", type: "{ stiffness?: number; damping?: number; }", default: "{ stiffness: 200, damping: 16 }" },
		{ name: "springPathConfig", type: "{ coilCount?: number; amplitudeMin?: number; amplitudeMax…", default: "{}" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
