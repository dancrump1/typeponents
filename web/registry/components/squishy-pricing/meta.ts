import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "squishy-pricing",
	title: "Squishy Pricing",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["hover"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "cards", type: "SquishyPricingCard[]" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
