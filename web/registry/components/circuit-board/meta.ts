import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "circuit-board",
	title: "Circuit Board",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["canvas", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "ZenUI",
		url: "https://zenui.net/",
		authorUrl: "https://zenui.net",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
