import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "folding-logos",
	title: "Folding Logos",
	description: "",
	interaction: "",
	categories: ["Images"],
	tags: ["hover", "autoplay"],
	inspiration: {
		source: "Hover.dev",
		url: "https://www.hover.dev/components/testimonials",
		authorUrl: "https://www.hover.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion", "react-icons", "tailwind-merge"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
