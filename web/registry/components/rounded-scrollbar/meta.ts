import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "rounded-scrollbar",
	title: "Rounded Scrollbar",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["scroll-driven", "responsive"],
	inspiration: {
		source: "CodePen",
		url: "https://codepen.io/jh3y/pen/gOEgxbd",
		author: "jh3y",
		authorUrl: "https://codepen.io/jh3y",
		relationship: "adaptation",
	},
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
