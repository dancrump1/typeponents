import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "navbar3",
	title: "Navbar3",
	description:
		"Minimal navigation bar pinned to the top of the page, with a logo, one text link, and a light/dark mode toggle.",
	interaction:
		"Hovering the nav button tints its label pink; clicking the toggle switches the page between light and dark. The bar stays fixed in place as you scroll.",
	categories: ["Navigation"],
	tags: ["hover"],
	inspiration: {
		source: "Hover.dev",
		url: "https://www.hover.dev/components/heros",
		authorUrl: "https://www.hover.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: ["mode-toggle"],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
