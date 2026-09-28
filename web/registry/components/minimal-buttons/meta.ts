import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "minimal-buttons",
	title: "Minimal Buttons",
	description: "A tactile, retro-modern button component featuring beveled top-border highlights, inner gradients, and inset shadow detailing.",
	interaction: "Press animation and smooth theme-aligned tactile hover state shifts.",
	categories: ["Buttons"],
	tags: ["hover"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/minimal-buttons",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "href", type: "string" },
		{ name: "variant", type: "\"primary\" | \"secondary\" | \"outline\" | \"ghost\" | \"destruct…", default: "\"primary\"" },
		{ name: "size", type: "\"default\" | \"xs\" | \"sm\" | \"lg\"", default: "\"default\"" },
		{ name: "isLoading", type: "boolean", default: "false" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
