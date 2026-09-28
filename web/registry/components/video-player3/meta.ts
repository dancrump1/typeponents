import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "video-player3",
	title: "Video Player3",
	description:
		"Alternate custom video player layout.",
	interaction:
		"Play, pause and scrub from a restyled control bar.",
	categories: ["Videos"],
	tags: ["drag", "hover", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "ui.8starlabs.com",
		url: "https://ui.8starlabs.com/docs/components/video-player",
		relationship: "adaptation",
	},
	dependencies: ["class-variance-authority", "lucide-react"],
	registryDependencies: ["button"],
	props: [],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
