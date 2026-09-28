import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "lanyard",
	title: "Lanyard",
	description: "",
	interaction: "",
	categories: ["3D & Canvas"],
	tags: ["webgl", "drag"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/components/lanyard",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["@react-three/drei", "@react-three/fiber", "@react-three/rapier", "meshline", "three"],
	registryDependencies: [],
	props: [
		{ name: "position", type: "[number, number, number]", default: "[0, 0, 30]" },
		{ name: "gravity", type: "[number, number, number]", default: "[0, -40, 0]" },
		{ name: "fov", type: "number", default: "20" },
		{ name: "transparent", type: "boolean", default: "true" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
