import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "book-testimonials",
	title: "Book Testimonials",
	description:
		"Testimonials bound as a hardback book, with a cover, a clickable index and one quote, photo and star rating per page.",
	interaction:
		"Dragging a page corner or clicking the edge of the book turns the page with a curling flip; picking a name from the index flips straight through to that person's page.",
	categories: ["Testimonials"],
	tags: ["hover"],
	inspiration: {
		source: "Serenity UI",
		url: "https://www.serenity-ui.com/components/testimonials/3dbooktestimonial",
		authorUrl: "https://www.serenity-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["react-pageflip"],
	registryDependencies: [],
	props: [
		{ name: "testimonials", type: "Testimonial[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
