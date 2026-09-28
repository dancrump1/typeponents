import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "preloader",
	title: "Preloader",
	description:
		"Full-screen black loading overlay with a curved bottom edge and a single word cycling through a short phrase.",
	interaction:
		"On load the words swap out one after another, and moving the pointer leaves a trail of images across the black panel; when loading ends the curved bottom edge flattens and the whole overlay slides up off the screen.",
	categories: ["Loaders"],
	tags: [],
	inspiration: {
		source: "Spark UI",
		url: "https://www.sparkui.site/components/apple-preloader",
		authorUrl: "https://www.sparkui.site",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["mouse-image-trail"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
