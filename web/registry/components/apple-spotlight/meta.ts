import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "apple-spotlight",
	title: "Apple Spotlight",
	description: "A beautiful search component inspired by macOS Spotlight.",
	interaction: "Click the trigger to open a macOS-style search overlay; type to filter results.",
	categories: ["Navigation"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/appleSpotlight",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: ["button"],
	props: [
		{ name: "shortcuts", type: "Shortcut[]", default: "[ { label: 'Apps', icon: <LayoutGrid …" },
		{ name: "isOpen", type: "boolean", default: "true" },
		{ name: "handleClose", type: "(() => void)", default: "() => {}" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
