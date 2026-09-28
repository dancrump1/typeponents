import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "diamond-gallery",
	title: "Diamond Gallery",
	description: "",
	interaction: "",
	categories: ["Media Galleries"],
	tags: ["hover"],
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "images", type: "ImageItem[]", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
