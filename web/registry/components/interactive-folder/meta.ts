import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "interactive-folder",
	title: "Interactive Folder",
	description: "An animated folder component that expands to reveal file contents with smooth spring animations and interactive hover effects.",
	interaction: "Click the folder and it springs open to reveal a grid of files.",
	categories: ["Cards"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/interactivefolder",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "folderName", type: "string", default: "'New Folder'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
