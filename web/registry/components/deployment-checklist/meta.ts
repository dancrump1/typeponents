import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "deployment-checklist",
	title: "Deployment Checklist",
	description: "An interactive CI/CD pipeline protocol checklist depicting git clone, install, build, and deploy stages with custom animated status icons.",
	interaction: "Sequentially executable checklist with running spin state, skipped items, error logs, and detailed step drawer toggling.",
	categories: ["Cards"],
	tags: ["spring", "hover", "theme-aware"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/deployment-checklist",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["framer-motion", "motion", "next-themes"],
	registryDependencies: [],
	props: [
		{ name: "initialTasks", type: "Task[]" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
