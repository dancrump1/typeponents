import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "circle-menu",
	title: "Circle Menu",
	description: "A circular navigation menu that expands items in a circle around a central button with smooth animations and hover effects.",
	interaction: "Tap the center button and items spring out in a ring; hover shows each label.",
	categories: ["Navigation"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/circleMenu",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ label: string; icon: React.ReactNode; href: string; }[]", required: true },
		{ name: "openIcon", type: "React.ReactNode", default: "<Menu size={18} className=\"text-white…" },
		{ name: "closeIcon", type: "React.ReactNode", default: "<X size={18} className=\"text-white\" />" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
