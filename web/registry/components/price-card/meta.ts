import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "price-card",
	title: "Price Card",
	description:
		"Single pricing card showing plan name, monthly price and a feature list with circled check marks.",
	interaction:
		"On load the card rises and fades in while the feature rows slide in from the left one after another, each check badge popping to size; the order button dips in scale when pressed.",
	categories: ["Cards"],
	tags: ["spring", "hover"],
	dependencies: ["lucide-react", "motion"],
	registryDependencies: ["scaling-button"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
