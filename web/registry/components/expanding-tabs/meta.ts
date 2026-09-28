import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "expanding-tabs",
	title: "Expanding Tabs",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "geist.vercel.app",
		url: "https://geist.vercel.app/docs/framer-motion/navigation/expandable-tabs",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion", "usehooks-ts"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
