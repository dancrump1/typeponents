import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "spring-faq",
	title: "Spring FAQ",
	description: "",
	interaction: "",
	categories: ["Accordions"],
	tags: ["spring"],
	inspiration: {
		source: "Star UI",
		url: "https://starui.link/docs/components/faq-spring",
		authorUrl: "https://starui.link",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
