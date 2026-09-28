import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "folder",
	title: "Folder",
	description: "",
	interaction: "",
	categories: ["Media Galleries"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/components/folder",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "color", type: "string", default: "\"#00d8ff\"" },
		{ name: "size", type: "number", default: "1" },
		{ name: "items", type: "React.ReactNode[]", default: "[]" },
		{ name: "className", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
