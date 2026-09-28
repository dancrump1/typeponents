import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "sidebar",
	title: "Sidebar",
	description:
		"Collapsible sidebar navigation.",
	interaction:
		"Open and close the sidebar; nested items expand in place.",
	categories: ["Navigation"],
	tags: ["hover"],
	dependencies: ["@tabler/icons-react", "lucide-react", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
