import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "mobile-mockup",
	title: "Mobile Mockup",
	description: "An interactive mobile device frame mockup with a realistic smartphone chassis, status bar, and WhatsApp mobile chat UI.",
	interaction: "Animated message stream, interactive audio notes, and responsive dark/light mode device chassis.",
	categories: ["Special Effects & FX"],
	tags: ["spring", "hover", "autoplay"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/mobile-mockup",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "headerTitle", type: "string", default: "\"Taylor\"" },
		{ name: "headerSubtitle", type: "string", default: "\"online\"" },
		{ name: "avatarUrl", type: "string", default: "\"https://images.unsplash.com/photo-14…" },
		{ name: "avatarFallback", type: "string", default: "\"T\"" },
		{ name: "messages", type: "ChatMessage[]", default: "DEFAULT_MESSAGES" },
		{ name: "autoPlay", type: "boolean", default: "true" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
