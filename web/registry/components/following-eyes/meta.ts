import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "following-eyes",
	title: "Following Eyes",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["hover", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "nurui.vercel.app",
		url: "https://nurui.vercel.app/docs/following-eye",
		relationship: "adaptation",
	},
	dependencies: ["react-inlinesvg"],
	registryDependencies: ["theme-changer"],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
