import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "floating-menu",
	title: "Floating Menu",
	description: "A floating, animated capsule menu that expands into a full-screen navigation overlay.",
	interaction: "Click to expand capsule into a full menu with staggered link animations.",
	categories: ["Navigation"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/floating-menu",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
