import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "spiral-3d-slider",
	title: "Spiral 3D Slider",
	description: "",
	interaction: "",
	categories: ["Carousels", "3D & Canvas"],
	tags: ["webgl", "scroll-driven", "responsive"],
	inspiration: {
		source: "Componentry",
		url: "https://componentry.dev/docs/components/spiral-3d-slider",
		authorUrl: "https://componentry.dev",
		relationship: "adaptation",
	},
	dependencies: ["@react-three/fiber", "three"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "message", type: "string", default: "\"Interactive WebGL content is unavail…" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
