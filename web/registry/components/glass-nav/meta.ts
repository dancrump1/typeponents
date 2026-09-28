import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "glass-nav",
	title: "Glass Nav",
	description:
		"Frosted glass navigation bar with a centred logo, link pills and a collapsible mobile menu.",
	interaction:
		"Moving the pointer across the bar hides the real cursor and replaces it with a round indigo badge that follows it. Links and buttons frost over and grow a little on hover, and the menu icon slides the mobile links open.",
	categories: ["Navigation"],
	tags: ["hover"],
	inspiration: {
		source: "Hover.dev",
		url: "https://www.hover.dev/components/navigation",
		authorUrl: "https://www.hover.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion", "react-icons", "react-use-measure"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
