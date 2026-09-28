import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "infinite-menu",
	title: "Infinite Menu",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["webgl", "canvas", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/components/infinite-menu",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["gl-matrix"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "MenuItem[]", default: "[]" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
