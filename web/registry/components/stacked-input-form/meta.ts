import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "stacked-input-form",
	title: "Stacked Input Form",
	description: "A progressive form that stacks input fields vertically with smooth animations, allowing users to focus on one field at a time while maintaining context.",
	interaction: "Each field stacks onto the last as you advance through a multi-step form.",
	categories: ["Forms & Inputs"],
	tags: ["spring", "hover", "keyboard"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/stackedInputForm",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: ["button", "input", "label", "popover", "radio-group", "select", "slider", "textarea"],
	props: [
		{ name: "fields", type: "Field[]", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
