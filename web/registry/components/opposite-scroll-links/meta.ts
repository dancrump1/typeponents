import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "opposite-scroll-links",
	title: "Opposite Scroll Links",
	description:
		"Split index of full-height image links, with the left and right columns scrolling past each other in opposite directions.",
	interaction:
		"Scrolling drives the left column one way and the right column the other, so the two halves slide past each other. Hovering an image washes it over and fades the project title in on top; clicking opens that project.",
	categories: ["Navigation"],
	tags: ["scroll-driven", "hover"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	notes: "2 demos: demo.tsx, demo-oppositescroll.tsx.",
});
