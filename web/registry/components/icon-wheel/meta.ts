import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "icon-wheel",
	title: "Icon Wheel",
	description: "A rotating wheel that displays your tech stack icons in continuous motion. Perfect for showcasing programming languages and frameworks on your portfolio with smooth animations and hover effects.",
	interaction: "Icons orbit in a slowly rotating wheel; hover scales the one under the pointer.",
	categories: ["Special Effects & FX"],
	tags: ["hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/iconwheel",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "icons", type: "string[]", required: true },
		{ name: "radius", type: "number", default: "200" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
