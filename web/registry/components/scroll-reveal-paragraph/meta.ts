import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scroll-reveal-paragraph",
	title: "Scroll Reveal Paragraph",
	description:
		"Paragraph printed in faint grey that fills in to full contrast one word at a time, tied to how far it has scrolled up the screen.",
	interaction:
		"Scrolling drives the whole effect: words light up left to right as the paragraph rises through the upper half of the screen, and dim again if you scroll back down.",
	categories: ["Text Animations"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "SmoothUI",
		url: "https://smoothui.dev/doc/text/scroll-reveal-paragraph",
		authorUrl: "https://smoothui.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "paragraph", type: "string", required: true },
		{ name: "className", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "draft",
	notes: "No demo yet.",
});
