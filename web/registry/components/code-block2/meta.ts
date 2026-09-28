import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "code-block2",
	title: "Code Block2",
	description:
		"Tabbed code block with a sliding underline on the active tab and a copy button that flips to a tick.",
	interaction:
		"Clicking a tab slides the underline across to it while the old snippet blurs and slides out sideways and the new one blurs in from the opposite edge; the copy icon rotates into a checkmark for two seconds after you click it.",
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
	status: "needs-review",
});
