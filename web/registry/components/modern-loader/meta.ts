import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "modern-loader",
	title: "Modern Loader",
	description: "",
	interaction: "",
	categories: ["Loaders"],
	tags: ["autoplay"],
	inspiration: {
		source: "ScrollX UI",
		url: "https://scrollxui.dev/docs/components/modern-loader",
		authorUrl: "https://scrollxui.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["text-type"],
	props: [
		{ name: "words", type: "string[]", default: "[ 'Setting things up...', 'Initializi…" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
