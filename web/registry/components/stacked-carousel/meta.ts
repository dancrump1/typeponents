import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "stacked-carousel",
	title: "Stacked Carousel",
	description: "",
	interaction: "",
	categories: ["Carousels"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Eclair UI",
		url: "https://eclairui.gopx.dev/components/carousels/stacked-carousel",
		authorUrl: "https://eclairui.gopx.dev",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "images", type: "string[]", required: true },
		{ name: "width", type: "number", default: "300" },
		{ name: "height", type: "number", default: "400" },
		{ name: "borderColor", type: "string", default: "\"white\"" },
		{ name: "borderWidth", type: "number", default: "12" },
		{ name: "backgroundColor", type: "string", default: "\"#e0f1fa\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
