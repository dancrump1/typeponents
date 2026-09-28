import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "electric-ai-input",
	title: "Electric AI Input",
	description: "A modern AI-style input component with file upload support. Features smooth loading animations, customizable colors, and an intuitive interface perfect for AI chat applications.",
	interaction: "Type a prompt, attach a file, and watch an orbit or pulse animation while it submits.",
	categories: ["Forms & Inputs"],
	tags: ["spring", "hover", "keyboard", "responsive"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/electricaiinput",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "width", type: "string", default: "'400px'" },
		{ name: "className", type: "string" },
		{ name: "placeholder", type: "string", default: "'Ask me anything...'" },
		{ name: "style", type: "React.CSSProperties" },
		{ name: "rows", type: "number", default: "2" },
		{ name: "mainColor", type: "string", default: "'#FFDC00'" },
		{ name: "backgroundColor", type: "string", default: "'#111111'" },
		{ name: "onSubmit", type: "((value: string, file: File | null) => void | Promise<void>)" },
		{ name: "animationStyle", type: "\"orbit\" | \"pulse\"", default: "'orbit'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
