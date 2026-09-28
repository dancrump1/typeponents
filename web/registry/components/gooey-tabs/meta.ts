import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "gooey-tabs",
	title: "Gooey Tabs",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["spring"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/filter/gooey-svg-filter",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["button"],
	props: [
		{ name: "id", type: "string", default: "\"goo-filter\"" },
		{ name: "strength", type: "number", default: "10" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
