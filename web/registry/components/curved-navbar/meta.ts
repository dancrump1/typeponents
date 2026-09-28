import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "curved-navbar",
	title: "Curved Navbar",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["hover"],
	inspiration: {
		source: "Spark UI",
		url: "https://www.sparkui.site/components/curved-navbar",
		authorUrl: "https://www.sparkui.site",
		relationship: "adaptation",
	},
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
