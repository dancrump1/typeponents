import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "floating-dock",
	title: "Floating Dock",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["spring", "hover", "cursor-tracking"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/floating-dock",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["@tabler/icons-react", "motion", "react-icons"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ title: string; icon: React.ReactNode; href: string; }[]", default: "links" },
		{ name: "desktopClassName", type: "string" },
		{ name: "mobileClassName", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
