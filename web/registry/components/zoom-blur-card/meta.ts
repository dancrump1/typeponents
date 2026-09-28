import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "zoom-blur-card",
	title: "Zoom Blur Card",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["hover"],
	inspiration: {
		source: "Eclair UI",
		url: "https://eclairui.gopx.dev/components/cards/zoom-blur-card",
		authorUrl: "https://eclairui.gopx.dev",
		relationship: "adaptation",
	},
	dependencies: ["clsx", "motion", "react-icons"],
	registryDependencies: [],
	props: [
		{ name: "title", type: "string", required: true },
		{ name: "description", type: "string", required: true },
		{ name: "imageUrl", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
