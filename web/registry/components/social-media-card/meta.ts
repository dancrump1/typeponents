import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "social-media-card",
	title: "Social Media Card",
	description: "A versatile card component that mimics the look and feel of popular social media platforms. Supports Twitter/X, Reddit, and Peerlist styles with authentic layouts, interaction buttons, and platform-specific design elements.",
	interaction: "Renders a post in X, Reddit, or Peerlist chrome with the matching actions.",
	categories: ["Cards"],
	tags: [],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/socialMediaCard",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "post", type: "PostType", required: true },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
