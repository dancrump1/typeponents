import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "aceternity-button",
	title: "Aceternity Button",
	description: "A soft, convex tactile button component featuring inner shadows, active scaling states, and smooth gradients for premium feedback.",
	interaction: "Hover offset transitions, inset shadow focus states, and press-down scale animations.",
	categories: ["Buttons"],
	tags: ["hover"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/aceternity-button",
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
		{ name: "size", type: "\"sm\" | \"md\" | \"lg\" | \"xl\"", default: "\"md\"" },
		{ name: "isLoading", type: "boolean", default: "false" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
