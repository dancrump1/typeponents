import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "threads",
	title: "Threads",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["webgl", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/backgrounds/threads",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["ogl"],
	registryDependencies: [],
	props: [
		{ name: "color", type: "[number, number, number]", default: "[1, 1, 1]" },
		{ name: "amplitude", type: "number", default: "1" },
		{ name: "distance", type: "number", default: "0" },
		{ name: "enableMouseInteraction", type: "boolean", default: "false" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
