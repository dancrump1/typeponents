import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "codeblock3",
	title: "Codeblock3",
	description:
		"Multi-tab code panel with a copy button, a scrollable snippet area and an underline marking the open tab.",
	interaction:
		"Switching tabs travels the underline to the new tab and cross-fades the snippets with a sideways blur in the direction you moved; copying swaps the icon to a tick and the label to Copied for two seconds.",
	categories: ["Text"],
	tags: ["spring", "hover", "responsive"],
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "tabs", type: "CodeTab[]" },
		{ name: "code", type: "string" },
		{ name: "language", type: "string", default: "\"bash\"" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "draft",
	notes: "No demo yet.",
});
