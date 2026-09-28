import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "video-player2",
	title: "Video Player2",
	description:
		"Custom video player with overlay controls.",
	interaction:
		"Play, pause and scrub a video from the custom chrome rather than native controls.",
	categories: ["Videos"],
	tags: ["spring", "hover", "keyboard"],
	dependencies: ["lucide-react", "motion"],
	registryDependencies: ["button"],
	props: [
		{ name: "videoId", type: "string", required: true },
		{ name: "title", type: "string" },
		{ name: "defaultExpanded", type: "boolean", default: "false" },
		{ name: "customThumbnail", type: "string" },
		{ name: "className", type: "string" },
		{ name: "containerClassName", type: "string" },
		{ name: "expandedClassName", type: "string" },
		{ name: "thumbnailClassName", type: "string" },
		{ name: "thumbnailImageClassName", type: "string" },
		{ name: "playButtonClassName", type: "string" },
		{ name: "playIconClassName", type: "string" },
		{ name: "titleClassName", type: "string" },
		{ name: "controlsClassName", type: "string" },
		{ name: "expandButtonClassName", type: "string" },
		{ name: "backdropClassName", type: "string" },
		{ name: "playerClassName", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
