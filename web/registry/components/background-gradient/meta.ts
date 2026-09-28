import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "background-gradient",
	title: "Background Gradient",
	description:
		"Card wrapper ringed by a four-colour radial gradient with a blurred glow behind it.",
	interaction:
		"Runs on its own — the gradient slides back and forth around the edge of the card in a slow loop, and the outer glow brightens while the pointer is over it.",
	categories: ["Backgrounds"],
	tags: ["hover"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "containerClassName", type: "string" },
		{ name: "animate", type: "boolean", default: "true" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
