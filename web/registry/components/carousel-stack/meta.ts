import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "carousel-stack",
	title: "Carousel Stack",
	description:
		"Carousel that keeps its slides in a stack, the upcoming ones peeking out below the top card, with back and forward arrows.",
	interaction:
		"Clicking forward drops the top card away and lifts the next one up into place while the stack behind shifts up a step; clicking back reverses it, and the arrows grey out at either end.",
	categories: ["Carousels"],
	tags: [],
	inspiration: {
		source: "Star UI",
		url: "https://starui.link/docs/components/stack-card",
		authorUrl: "https://starui.link",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "cards", type: "React.ReactNode[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
