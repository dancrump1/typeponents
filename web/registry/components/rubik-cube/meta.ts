import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "rubik-cube",
	title: "Rubik Cube",
	description: "An interactive 3D Rubik's cube component with multiple dimensions, visual modes, and smooth drag-to-rotate animations.",
	interaction: "Drag to rotate a CSS 3D cube in 2×2, 3×3, or 4×4.",
	categories: ["3D & Canvas"],
	tags: ["drag"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/rubikcube",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "mode", type: "\"skeleton\" | \"normal\" | \"glass\"", default: "'normal'" },
		{ name: "dimensionMode", type: "\"2x2\" | \"3x3\" | \"4x4\"", default: "'3x3'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
