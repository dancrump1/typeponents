import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "spotlight-cards",
	title: "Spotlight Cards",
	description: "",
	interaction: "",
	categories: ["Cards", "Grids & Layouts"],
	tags: ["spring", "hover", "cursor-tracking"],
	inspiration: {
		source: "Kokonut UI",
		url: "https://kokonutui.com",
		authorUrl: "https://kokonutui.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "SpotlightItem[]", default: "DEFAULT_ITEMS" },
		{ name: "eyebrow", type: "string", default: "\"Features\"" },
		{ name: "heading", type: "string", default: "\"Everything you need\"" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
