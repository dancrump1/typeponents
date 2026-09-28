import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fold-hover-button",
	title: "Fold Hover Button",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "Eclair UI",
		url: "https://eclairui.gopx.dev/components/buttons/folder-hover-button",
		authorUrl: "https://eclairui.gopx.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "folderName", type: "string", required: true },
		{ name: "images", type: "string[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
