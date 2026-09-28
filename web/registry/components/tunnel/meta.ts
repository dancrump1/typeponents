import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tunnel",
	title: "Tunnel",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["webgl", "canvas", "autoplay", "responsive"],
	inspiration: {
		source: "vyomaui.design",
		url: "https://www.vyomaui.design/backgrounds/tunnel",
		relationship: "adaptation",
	},
	dependencies: ["three"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
