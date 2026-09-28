import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "mask-cursor-effect",
	title: "Mask Cursor Effect",
	description: "A component that reveals hidden content through a circular mask that follows your mouse. Perfect for creating interactive reveal effects.",
	interaction: "A circular mask follows the pointer and reveals hidden copy underneath.",
	categories: ["Cursor & Pointer Effects"],
	tags: ["hover", "cursor-tracking"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/maskcursoreffect",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "hiddenComponent", type: "React.ReactNode" },
		{ name: "className", type: "string" },
		{ name: "compressedMaskSize", type: "number", default: "40" },
		{ name: "expandedMaskSize", type: "number", default: "350" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
