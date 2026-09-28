import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hero-parallax",
	title: "Hero Parallax",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["spring", "scroll-driven", "hover"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/hero-parallax",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "products", type: "{ title: string; slug: string; image: { url: string; }; }[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
