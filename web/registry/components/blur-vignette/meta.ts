import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "blur-vignette",
	title: "Blur Vignette",
	description:
		"Image frame with a blurred border that fades inward, softening the edges instead of cropping them.",
	interaction: "Static — the blurred border is applied on load and does not respond to input.",
	categories: ["Backgrounds"],
	tags: [],
	inspiration: {
		source: "UI Layouts",
		url: "https://www.ui-layouts.com/components/blur-vignette",
		authorUrl: "https://www.ui-layouts.com",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
