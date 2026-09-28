import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scrambled-install-command",
	title: "Scrambled Install Command",
	description: "A copy-to-clipboard command installation component featuring an animated scramble text effect.",
	interaction: "Scrambles text on change, copy to clipboard, package manager selection.",
	categories: ["Text Animations"],
	tags: ["hover", "autoplay", "responsive"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/scrambled-install-command",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "intervalMs", type: "number", default: "32" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
