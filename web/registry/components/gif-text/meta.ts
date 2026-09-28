import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "gif-text",
	title: "Gif Text",
	description:
		"Heavy headline text with an animated GIF playing inside the letterforms instead of a flat colour.",
	interaction:
		"Runs on its own — the GIF loops inside the letters. The text starts in a solid fallback colour and fades over to the moving fill once the image has loaded.",
	categories: ["Text"],
	tags: [],
	inspiration: {
		source: "Cult UI",
		url: "https://www.cult-ui.com/docs/components/text-gif",
		authorUrl: "https://www.cult-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["class-variance-authority"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
