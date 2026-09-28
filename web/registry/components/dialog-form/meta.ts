import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dialog-form",
	title: "Dialog Form",
	description: "An interactive form component that transforms from a button into a modal dialog with smooth animations. Features form validation, loading states, and success feedback with beautiful visual effects.",
	interaction: "A button morphs into a modal form, then plays a success or error state on submit.",
	categories: ["Forms & Inputs"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/dialogform",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react", "usehooks-ts"],
	registryDependencies: ["input", "textarea"],
	props: [
		{ name: "label", type: "string", required: true },
		{ name: "successText", type: "string", required: true },
		{ name: "successIcon", type: "React.ReactNode", required: true },
		{ name: "icon", type: "React.ReactNode" },
		{ name: "buttonClassName", type: "string" },
		{ name: "containerClassName", type: "string" },
		{ name: "childComponent", type: "React.ReactNode", default: "null" },
		{ name: "onSubmit", type: "(() => Promise<{ success: boolean; message: string; }> | …" },
		{ name: "onClose", type: "(() => void)" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
