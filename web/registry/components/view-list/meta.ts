import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "view-list",
	title: "View List",
	description: "",
	interaction: "",
	categories: ["Data & Tables"],
	tags: ["spring"],
	dependencies: ["lucide-react", "motion"],
	registryDependencies: ["button"],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
