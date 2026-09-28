import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "macbook-mockup",
	title: "Macbook Mockup",
	description: "A realistic 3D Macbook Pro device frame mockup with aluminum casing, keyboard base, and dual-pane WhatsApp Web chat UI.",
	interaction: "Interactive dual-pane sidebar & chat stream, voice notes, and desktop laptop frame animations.",
	categories: ["Special Effects & FX"],
	tags: ["spring", "hover", "autoplay"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/macbook-mockup",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "headerTitle", type: "string", default: "\"Alex (Design Lead)\"" },
		{ name: "headerSubtitle", type: "string", default: "\"online\"" },
		{ name: "avatarUrl", type: "string", default: "\"https://images.unsplash.com/photo-15…" },
		{ name: "avatarFallback", type: "string", default: "\"A\"" },
		{ name: "userAvatarUrl", type: "string", default: "\"https://images.unsplash.com/photo-15…" },
		{ name: "messages", type: "ChatMessage[]", default: "DEFAULT_MESSAGES" },
		{ name: "autoPlay", type: "boolean", default: "true" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
