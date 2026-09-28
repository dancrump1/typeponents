import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "pricing-table",
	title: "Pricing Table",
	description:
		"Four-column pricing grid with a monthly/annual billing toggle and one best-value plan tinted by a warm gradient.",
	interaction:
		"Clicking monthly or annually glides the pill behind the two labels across and swaps every price in the grid; hovering a plan lifts the card a little and brightens its background, and its button scales up.",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	inspiration: {
		source: "cuicui.day",
		url: "https://cuicui.day/marketing-ui/pricing-tables",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
