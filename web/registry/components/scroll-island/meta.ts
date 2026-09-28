import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scroll-island",
	title: "Scroll Island",
	description:
		"Floating pill docked at the bottom of the page showing a circular progress ring, the current section title and a scroll percentage.",
	interaction:
		"Scrolling fills the ring and updates the title and percentage; clicking the pill grows it upward into a list of section links that sharpen from blurred, and picking one jumps to that section and collapses the pill.",
	categories: ["Navigation"],
	tags: ["spring", "scroll-driven"],
	inspiration: {
		source: "Star UI",
		url: "https://starui.link/docs/components/scroll-island",
		authorUrl: "https://starui.link",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	notes: "2 demos: demo.tsx, demo-scrollrevealparagraph.tsx.",
});
