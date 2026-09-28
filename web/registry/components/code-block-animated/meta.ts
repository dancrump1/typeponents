import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "code-block-animated",
	title: "Code Block Animated",
	description:
		"Syntax-highlighted code frame with a language icon, a copy button and an optional typewriter reveal.",
	interaction:
		"With the typing effect on, the snippet types itself out character by character on load behind a blinking cursor and the panel scrolls down to follow; clicking copy lifts the whole snippet to the clipboard.",
	categories: ["Text"],
	tags: ["autoplay"],
	inspiration: {
		source: "odysseyui.com",
		url: "https://www.odysseyui.com/docs/components/animate/code-block",
		relationship: "adaptation",
	},
	dependencies: ["shiki"],
	registryDependencies: [],
	props: [
		{ name: "code", type: "string", required: true },
		{ name: "language", type: "string", default: "'javascript'" },
		{ name: "className", type: "string" },
		{ name: "typeEffect", type: "boolean", default: "false" },
		{ name: "duration", type: "number", default: "5000" },
		{ name: "delay", type: "number", default: "0" },
		{ name: "theme", type: "string", default: "'one-dark-pro'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
