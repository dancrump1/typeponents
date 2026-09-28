import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "family-drawer",
	title: "Family Drawer",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["hover"],
	inspiration: {
		source: "Cult UI",
		url: "https://www.cult-ui.com/docs/components/family-drawer",
		authorUrl: "https://www.cult-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["@radix-ui/react-slot", "lucide-react", "motion", "react-use-measure", "vaul"],
	registryDependencies: [],
	props: [
		{ name: "open", type: "boolean" },
		{ name: "defaultOpen", type: "boolean", default: "false" },
		{ name: "onOpenChange", type: "((open: boolean) => void)" },
		{ name: "defaultView", type: "string", default: "\"default\"" },
		{ name: "onViewChange", type: "((view: string) => void)" },
		{ name: "views", type: "ViewsRegistry" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
