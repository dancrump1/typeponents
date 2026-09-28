import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "theme-animations",
	title: "Theme Animations",
	description:
		"View-transition recipes for circular, blurred and polygonal theme switches.",
	interaction:
		"Call createAnimation with a variant and origin; the returned CSS drives a view transition when the theme toggles.",
	categories: ["Utilities"],
	tags: [],
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
