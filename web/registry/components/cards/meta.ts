import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "cards",
	title: "Cards",
	description:
		"Set of flip-card building blocks — container, header, divider, front and back faces, and buttons — for cards with two sides.",
	interaction:
		"Clicking the card button turns the card on its vertical axis, swinging the current face away while the other face swings in to replace it.",
	categories: ["Cards"],
	tags: [],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
