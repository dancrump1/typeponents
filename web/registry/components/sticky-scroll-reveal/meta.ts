import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "sticky-scroll-reveal",
	title: "Sticky Scroll Reveal",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/sticky-scroll-reveal",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "content", type: "{ title: string; description: string; content?: React.Rea…", required: true },
		{ name: "contentClassName", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
