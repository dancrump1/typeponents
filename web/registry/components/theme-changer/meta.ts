import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "theme-changer",
	title: "Theme Changer",
	description: "",
	interaction: "",
	categories: ["Utilities"],
	tags: ["internal", "hover", "theme-aware"],
	inspiration: {
		source: "skiper-ui.com",
		url: "https://skiper-ui.com/docs/components/theme-toggle-animations",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "next-themes"],
	registryDependencies: ["button", "theme-animations"],
	props: [
		{ name: "variant", type: "AnimationVariant", default: "\"circle-blur\"" },
		{ name: "start", type: "AnimationStart", default: "\"top-left\"" },
		{ name: "showLabel", type: "boolean", default: "false" },
		{ name: "url", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	hidden: true,
	notes: "Shared internal module; installable but not listed.",
});
