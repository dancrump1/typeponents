import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "ghost-label",
	title: "Ghost Label",
	description:
		"Oversized faint word sitting behind content as a watermark-style background label.",
	interaction:
		"Static layout — the giant word is painted once behind the content at low opacity and does not respond to input.",
	categories: ["Text"],
	tags: [],
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
