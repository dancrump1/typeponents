import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "3d-nav-bar",
	title: "3D Nav Bar",
	description:
		"Desktop nav bar whose top-level items open a floating panel of links beside a large preview image.",
	interaction:
		"Hovering a nav item opens its panel, which travels across to the next item rather than reappearing; hovering a link inside swaps the preview image shown next to it.",
	categories: ["Navigation"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/navbar-menu",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["3d-card", "mobile-nav-basic", "mode-toggle"],
	props: [
		{ name: "routes", type: "any[]", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
