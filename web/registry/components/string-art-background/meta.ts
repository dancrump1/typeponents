import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "string-art-background",
	title: "String Art Background",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["canvas", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "ZenUI",
		url: "https://zenui.net/animations/background-animations",
		authorUrl: "https://zenui.net",
		relationship: "adaptation",
	},
	dependencies: ["react-icons"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
