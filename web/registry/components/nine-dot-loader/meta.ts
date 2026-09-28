import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "nine-dot-loader",
	title: "Nine Dot Loader",
	description:
		"Loading indicator made of a three-by-three grid of rounded dots that pulse out of step with each other.",
	interaction:
		"Runs on its own with no input — every dot swells and shrinks on a one-second loop, each starting at a random moment so the grid twinkles rather than beating in unison.",
	categories: ["Loaders"],
	tags: [],
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
