import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "animated-accordion",
	title: "Animated Accordion",
	description:
		"Vertical stack of photo panels, each with a headline, where the open one shows its full copy and two buttons.",
	interaction:
		"Clicking a panel springs it open to full height while its photo settles and brightens, the heading grows, and the paragraph and buttons stagger in below; hovering a closed panel nudges it a little taller as a preview.",
	categories: ["Accordions"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "ZenUI",
		url: "https://zenui.net/animations/animated-accordion",
		authorUrl: "https://zenui.net",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
