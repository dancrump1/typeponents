import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "great-ui-accordion",
	title: "Accordion",
	description: "An interactive Accordion component with smooth expand/collapse animations.",
	interaction: "Accordion toggle with height animation and chevron rotation on click.",
	categories: ["Accordions"],
	tags: [],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/accordion",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
