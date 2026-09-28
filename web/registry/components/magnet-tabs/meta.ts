import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "magnet-tabs",
	title: "Magnet Tabs",
	description: "MagnetTabs is a stylish tab navigation component for switching between sections in a user interface. It’s ideal for dashboards, settings pages, admin panels, or product views, anywhere content needs to be organized into tabs for better usability.",
	interaction: "The active tab's highlight slides to follow the selection like a magnet.",
	categories: ["Navigation"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/magnettabs",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "slug", type: "string", required: true },
		{ name: "options", type: "string[]", required: true },
		{ name: "onSelect", type: "(option: string) => void", required: true },
		{ name: "activeTab", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
