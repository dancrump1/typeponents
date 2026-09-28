import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "floating-nav",
	title: "Floating Nav",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["scroll-driven", "hover"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/floating-navbar",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["@tabler/icons-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "navItems", type: "{ name: string; link: string; icon?: React.ReactElement; }[]", default: "navItemsExample" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
