import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "stripe-accordion",
	title: "Stripe Accordion",
	description: "",
	interaction: "",
	categories: ["Accordions"],
	tags: ["drag", "scroll-driven", "hover", "keyboard"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
