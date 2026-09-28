import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "masonry-grid",
	title: "Masonry Grid",
	description: "A grid layout that arranges items like Pinterest, automatically fitting them together without gaps. Perfect for image galleries and portfolios.",
	interaction: "Items pack into a Pinterest-style masonry; hover lifts the card.",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/masonrygrid",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "{ image: string; title: string; description: string; }[]", required: true },
		{ name: "columns", type: "number", default: "undefined" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
