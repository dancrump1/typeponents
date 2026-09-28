import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "info-card",
	title: "Info Card",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "karrix.dev",
		url: "https://karrix.dev/components/info-card#",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "storageKey", type: "string" },
		{ name: "dismissType", type: "\"once\" | \"forever\"", default: "\"once\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
