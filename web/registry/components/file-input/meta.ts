import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "file-input",
	title: "File Input",
	description: "A sophisticated file upload component with drag-and-drop functionality, animated loading states, and file previews. Features file validation, size limits, and smooth transitions between upload states with beautiful visual feedback.",
	interaction: "Drag a file in or click to browse; the drop zone animates through loading and preview.",
	categories: ["Forms & Inputs"],
	tags: ["spring", "drag", "hover", "responsive"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/fileinput",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "accept", type: "string", default: "'image/png, image/jpeg, application/pdf'" },
		{ name: "maxSizeInMB", type: "number", default: "10" },
		{ name: "onFileChange", type: "((files: FileList) => void | Promise<void>)" },
		{ name: "allowMultiple", type: "boolean", default: "false" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
