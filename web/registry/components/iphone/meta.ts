import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "iphone",
	title: "Iphone",
	description: "",
	interaction: "",
	categories: ["3D & Canvas"],
	tags: ["autoplay"],
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "src", type: "string" },
		{ name: "videoSrc", type: "string" },
		{ name: "onVideoReady", type: "(() => void)" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
