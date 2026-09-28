import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "code-block",
	title: "Code Block",
	description: "",
	interaction: "",
	categories: ["Text"],
	tags: ["hover"],
	dependencies: ["@tabler/icons-react", "react-syntax-highlighter"],
	registryDependencies: [],
	props: [
		{ name: "filename", type: "string", required: true },
		{ name: "code", type: "string", required: true },
		{ name: "language", type: "string", default: "\"typescript\"" },
		{ name: "highlightLines", type: "number[]", default: "[]" },
		{ name: "tabs", type: "{ name: string; code: string; language?: string; highligh…", default: "[]" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	notes: "2 demos: demo.tsx, demo-codeblock3.tsx.",
});
