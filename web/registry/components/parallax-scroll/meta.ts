import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "parallax-scroll",
	title: "Parallax Scroll",
	description: "",
	interaction: "",
	categories: ["Media Galleries"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/parallax-scroll",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "images", type: "string[]", required: true },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
