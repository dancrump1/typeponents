import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "stackbits-sidebar",
	title: "Sidebar",
	description: "A collapsible navigation sidebar with smooth expand/collapse animations and hover previews. Features icon-based navigation with animated content panels that slide in and out seamlessly.",
	interaction: "Icons expand into labeled panels on hover or click, then collapse back.",
	categories: ["Navigation"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/sidebar",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
