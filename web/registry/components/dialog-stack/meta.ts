import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dialog-stack",
	title: "Dialog Stack",
	description: "",
	interaction: "",
	categories: ["Modals"],
	tags: ["hover"],
	inspiration: {
		source: "Kibo UI",
		url: "https://www.kibo-ui.com/components/dialog-stack",
		authorUrl: "https://www.kibo-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["@radix-ui/react-use-controllable-state", "radix-ui"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
