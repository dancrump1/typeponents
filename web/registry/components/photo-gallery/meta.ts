import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "photo-gallery",
	title: "Photo Gallery",
	description: "An interactive photo gallery with smooth animations and layout transitions. Features a masonry-style grid with alternating row offsets, click-to-expand functionality, and elegant vignette effects for a premium visual experience.",
	interaction: "Scroll a staggered masonry; click a photo and it expands in place.",
	categories: ["Media Galleries"],
	tags: ["scroll-driven", "hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/photogallery",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "photos", type: "Photo[]", default: "Array.from({ length: 80 }).map((_, in…" },
		{ name: "rows", type: "number", default: "5" },
		{ name: "className", type: "string", default: "''" },
		{ name: "vignette", type: "boolean", default: "true" },
		{ name: "title", type: "string", default: "'POV: You had a great childhood'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
