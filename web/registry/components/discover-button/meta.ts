import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "discover-button",
	title: "Discover Button",
	description:
		"Floating search bar paired with a pill of category tabs, where the search field takes over the whole row when opened.",
	interaction:
		"Clicking the search pill stretches it wide and slides the input into view while the tabs blur away into a single close button; clicking a tab moves a coloured bubble behind the active label.",
	categories: ["Buttons"],
	tags: ["spring"],
	inspiration: {
		source: "uselayouts.com",
		url: "https://uselayouts.com/docs/components/discover-button",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["icons"],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
