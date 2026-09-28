import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "icons",
	title: "Icons",
	description: "",
	interaction: "",
	categories: ["Utilities"],
	tags: ["internal"],
	dependencies: ["framer-motion", "fuse.js", "motion", "nuqs"],
	registryDependencies: ["input"],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	hidden: true,
	notes: "Shared internal module; installable but not listed.",
});
