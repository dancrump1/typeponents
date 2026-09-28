import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "sandbox",
	title: "Sandbox",
	description: "",
	interaction: "",
	categories: ["Utilities"],
	tags: [],
	inspiration: {
		source: "Kibo UI",
		url: "https://www.kibo-ui.com/components/sandbox",
		authorUrl: "https://www.kibo-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["@codesandbox/sandpack-react"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
