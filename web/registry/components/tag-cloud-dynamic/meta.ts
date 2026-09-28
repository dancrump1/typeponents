import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tag-cloud-dynamic",
	title: "Tag Cloud Dynamic",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "ui.tripled.work",
		url: "https://ui.tripled.work/components/dynamic-tag-cloud",
		relationship: "adaptation",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "tags", type: "Tag[]", default: "[ { id: \"1\", label: \"React\" }, { id: …" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
