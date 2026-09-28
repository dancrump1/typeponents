import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hover-footer",
	title: "Hover Footer",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	inspiration: {
		source: "nurui.vercel.app",
		url: "https://nurui.vercel.app/docs/hover-footer",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react"],
	registryDependencies: ["text-hover"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
