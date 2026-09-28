import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scattered-scroll",
	title: "Scattered Scroll",
	description: "",
	interaction: "",
	categories: ["Scroll"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "Atelier UI",
		url: "https://www.atelier-ui.com/en/docs/components/scroll/scattered-scroll",
		authorUrl: "https://www.atelier-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "scrollDistance", type: "number", default: "200" },
		{ name: "overlap", type: "number", default: "0" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
