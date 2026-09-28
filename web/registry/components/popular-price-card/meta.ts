import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "popular-price-card",
	title: "Popular Price Card",
	description:
		"Pricing card with a Most Popular badge tucked behind its top edge, above a checked feature list.",
	interaction:
		"On load the card rises and fades in, each feature line slides in from the left with its check mark popping to size, and the badge lifts into place last.",
	categories: ["Cards"],
	tags: ["spring", "hover"],
	dependencies: ["lucide-react", "motion"],
	registryDependencies: ["button"],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
