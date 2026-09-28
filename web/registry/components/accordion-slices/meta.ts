import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "accordion-slices",
	title: "Accordion Slices",
	description:
		"Row of vertical label strips, each with an icon, that open into a full-height image panel.",
	interaction:
		"Clicking a strip slides its image panel open across the row while the previous one collapses, and the caption rises into the bottom of the panel; on narrow screens the strips stack and open downwards instead.",
	categories: ["Accordions"],
	tags: ["hover", "responsive"],
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
