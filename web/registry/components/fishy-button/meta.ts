import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fishy-button",
	title: "Fishy Button",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: [],
	inspiration: {
		source: "Namer UI",
		url: "https://namer-ui.netlify.app/components",
		authorUrl: "https://namer-ui.netlify.app",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "isDelete", type: "boolean", default: "false" },
		{ name: "onClick", type: "(() => void)" },
		{ name: "type", type: "\"button\" | \"submit\" | \"reset\"", default: "\"button\"" },
		{ name: "className", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
