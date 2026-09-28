import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "link-hover",
	title: "Link Hover",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: [],
	inspiration: {
		source: "emerald-ui.com",
		url: "https://emerald-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "Item[]", default: "DefaultItems" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
