import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "typewriter-testimonials",
	title: "Typewriter Testimonials",
	description: "",
	interaction: "",
	categories: ["Testimonials"],
	tags: ["hover"],
	inspiration: {
		source: "Serenity UI",
		url: "https://www.serenity-ui.com/components/testimonials/typewritertestimonial",
		authorUrl: "https://www.serenity-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "testimonials", type: "Testimonial[]", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
