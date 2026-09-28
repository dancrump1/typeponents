import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "video-masking",
	title: "Video Masking",
	description: "",
	interaction: "",
	categories: ["Videos"],
	tags: ["autoplay"],
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
