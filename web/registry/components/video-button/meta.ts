import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "video-button",
	title: "Video Button",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["hover", "autoplay"],
	inspiration: {
		source: "Eclair UI",
		url: "https://eclairui.gopx.dev/components/buttons/video-button",
		authorUrl: "https://eclairui.gopx.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "videoSrc", type: "string", required: true },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
