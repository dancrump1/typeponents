import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "link-preview",
	title: "Link Preview",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["spring", "hover", "cursor-tracking"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/link-preview",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["@radix-ui/react-hover-card", "motion"],
	registryDependencies: [],
	props: [
		{ name: "url", type: "string", required: true },
		{ name: "isStatic", type: "boolean", required: true },
		{ name: "className", type: "string" },
		{ name: "width", type: "number", default: "200" },
		{ name: "height", type: "number", default: "125" },
		{ name: "quality", type: "number", default: "50" },
		{ name: "layout", type: "string", default: "\"fixed\"" },
		{ name: "imageSrc", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
