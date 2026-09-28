import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "animated-link",
	title: "Animated Link",
	description: "An interactive link component supporting 13 premium hover variants including custom clipping masks, SVG sine waves, and text marquee animations.",
	interaction: "Hover text fill, SVG loops, marquee transition, doodle draw underline, overline, and dash arrow reveals.",
	categories: ["Buttons"],
	tags: ["hover"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/animated-link",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "variant", type: "AnimatedLinkVariant", default: "\"underline\"" },
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "showArrow", type: "boolean", default: "false" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
