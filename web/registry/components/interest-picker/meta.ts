import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "interest-picker",
	title: "Interest Picker",
	description: "An interactive component that allows users to select their interests from a visually appealing marquee-style grid. Users can choose from predefined categories with smooth animations and a minimum selection requirement.",
	interaction: "Pick interests from a marquee grid; selected chips collect until you submit.",
	categories: ["Forms & Inputs"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/interestpicker",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "interests", type: "Interest[]", default: "DUMMY_INTERESTS" },
		{ name: "showEmptySlot", type: "boolean", default: "false" },
		{ name: "onSubmit", type: "((interests: Interest[]) => Promise<void> | void)", default: "async (interests: Interest[]) => { //…" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
