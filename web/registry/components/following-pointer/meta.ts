import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "following-pointer",
	title: "Following Pointer",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/following-pointer",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "title", type: "React.ReactNode" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
