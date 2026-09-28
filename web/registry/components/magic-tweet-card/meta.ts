import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "magic-tweet-card",
	title: "Tweet Card",
	description: "A card that displays a tweet with the author's name, handle, and profile picture.",
	interaction: "",
	categories: ["Cards"],
	tags: [],
	inspiration: {
		source: "Magic UI",
		url: "https://magicui.design/docs/components/tweet-card",
		authorUrl: "https://magicui.design",
		relationship: "port",
	},
	dependencies: ["react-tweet"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "draft",
	notes: "demo.tsx is an intake scaffold — replace it with a real usage example.",
});
