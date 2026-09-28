import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "leave-rating",
	title: "Leave Rating",
	description: "A fun and interactive rating component that lets users share their experience with a smiley face that changes based on their rating. Users can hover over star ratings to see the face transform from sad to happy, making feedback collection engaging and visually appealing.",
	interaction: "Hover stars and a face morphs from sad to delighted before you submit.",
	categories: ["Forms & Inputs"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/leaverating",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "onSubmit", type: "((selected: number | false) => void)" },
		{ name: "question", type: "string", default: "'How was your experience?'" },
		{ name: "buttonText", type: "string", default: "'Submit'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
