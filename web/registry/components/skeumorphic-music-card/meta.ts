import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "skeumorphic-music-card",
	title: "Skeumorphic Music Card",
	description: "A music player card with realistic shadows and 3D effects. Includes play, pause, and skip controls for music apps.",
	interaction: "Play, pause, and skip on a raised music card with inset shadows.",
	categories: ["Cards"],
	tags: ["hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/skeumorphicMusicCard",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "title", type: "string", required: true },
		{ name: "artist", type: "string", required: true },
		{ name: "cover", type: "string", required: true },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
