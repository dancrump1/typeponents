import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "bookshelf",
	title: "Bookshelf",
	description:
		"Shelf of 3D hardback books, one per newsletter issue, with the title printed on each spine and cover.",
	interaction:
		"Dragging or scrolling sideways pans along the shelf, and hovering raises a book slightly with its title on a label that follows the pointer. Clicking pulls that book out and turns it to face you, where dragging spins it and clicking again opens the issue.",
	categories: ["3D & Canvas"],
	tags: ["webgl", "canvas", "drag", "cursor-tracking", "keyboard", "autoplay", "responsive"],
	inspiration: {
		source: "Componentry",
		url: "https://componentry.dev/docs/components/newsletter-bookshelf",
		authorUrl: "https://componentry.dev",
		relationship: "adaptation",
	},
	dependencies: ["@react-three/fiber", "three"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "NewsletterBookshelfItem[]", default: "defaultNewsletterBooks" },
		{ name: "className", type: "string" },
		{ name: "height", type: "string | number", default: "620" },
		{ name: "brand", type: "string", default: "\"The Brief\"" },
		{ name: "onSelect", type: "((item: NewsletterBookshelfItem, index: number) => void)" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
