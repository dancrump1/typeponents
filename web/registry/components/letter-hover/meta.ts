import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "letter-hover",
	title: "Letter Hover",
	description: "",
	interaction: "",
	categories: ["Text"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/text/letter-swap",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["random-letter-swap-hover"],
	props: [
		{ name: "label", type: "string", required: true },
		{ name: "reverse", type: "boolean", default: "true" },
		{ name: "transition", type: "any", default: "{ type: \"spring\", duration: 0.7, }" },
		{ name: "staggerDuration", type: "number", default: "0.03" },
		{ name: "staggerFrom", type: "number | \"first\" | \"last\" | \"center\"", default: "\"first\"" },
		{ name: "className", type: "string" },
		{ name: "onClick", type: "(() => void)" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
