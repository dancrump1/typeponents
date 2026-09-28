import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "skeleton",
	title: "Skeleton",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["spring", "responsive"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "width", type: "string | number", default: "\"100%\"", description: "Width of the skeleton element. Can be a string (CSS value) or number (pixels)" },
		{ name: "height", type: "string | number", default: "\"1rem\"", description: "Height of the skeleton element. Can be a string (CSS value) or number (pixels)" },
		{ name: "radius", type: "\"none\" | \"sm\" | \"md\" | \"lg\" | \"xl\" | \"full\"", default: "\"md\"", description: "Border radius of the skeleton element" },
		{ name: "animation", type: "\"none\" | \"pulse\" | \"wave\"", default: "\"pulse\"", description: "Animation type for the skeleton loading effect" },
		{ name: "className", type: "string", description: "Additional class names for the skeleton element" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
