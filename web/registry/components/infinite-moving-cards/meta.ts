import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "infinite-moving-cards",
	title: "Infinite Moving Cards",
	description: "",
	interaction: "",
	categories: ["Media Galleries"],
	tags: ["hover"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/infinite-moving-cards",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ quote: string; name: string; title: string; }[]", required: true },
		{ name: "direction", type: "\"left\" | \"right\"", default: "\"left\"" },
		{ name: "speed", type: "\"fast\" | \"normal\" | \"slow\"", default: "\"fast\"" },
		{ name: "pauseOnHover", type: "boolean", default: "true" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
