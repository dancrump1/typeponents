import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "animated-hover-card",
	title: "Animated Hover Card",
	description: "Tall gradient card with a title and a subtitle that stays hidden until you hover.",
	interaction:
		"Hovering the card reveals the subtitle one character at a time, each letter dropping into place a beat after the one before it.",
	categories: ["Cards"],
	tags: ["hover"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
