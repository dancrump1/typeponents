import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "video-player",
	title: "Video Player",
	description: "",
	interaction: "",
	categories: ["Videos"],
	tags: [],
	inspiration: {
		source: "tailwindflex.com",
		url: "https://tailwindflex.com/@samuel33/hero-with-video-background",
		relationship: "adaptation",
	},
	dependencies: ["video.js"],
	registryDependencies: [],
	props: [
		{ name: "firstLine", type: "string", required: true },
		{ name: "secondLine", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
