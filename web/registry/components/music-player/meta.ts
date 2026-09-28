import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "music-player",
	title: "Music Player",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["autoplay"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "src", type: "string", description: "The source URL of the audio file or YouTube video", required: true },
		{ name: "coverArt", type: "string", description: "The URL of the album cover image", required: true },
		{ name: "autoPlay", type: "boolean", default: "false", description: "Whether to auto-play the audio when loaded" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
