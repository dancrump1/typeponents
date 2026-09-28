import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "navigation",
	title: "Navigation",
	description:
		"Sticky site header with a logo, inline page links, a call-to-action button, and a hamburger menu on narrow screens.",
	interaction:
		"On small screens, tapping the hamburger folds its three bars into an X and a frosted panel of links drops down over the page; tapping again folds it away. Links and the button shift colour on hover.",
	categories: ["Navigation"],
	tags: ["hover"],
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
