import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "testimonial-ring",
	title: "Testimonial Ring",
	description: "Testimonial cards stood on a 3D ring over a reflecting grid floor. Drag it and it spins with inertia before snapping to a card; scrolling turns it too. Whichever card comes to the front blurs its quote in and rolls its metric on Number Flow.",
	interaction: "Drag the ring and it spins with your hand, coasts on the flick, and snaps to the nearest card. Scroll turns it as the section passes. The card in front blurs its quote in and rolls its metric.",
	categories: ["Testimonials"],
	tags: ["drag", "scroll-driven", "hover", "cursor-tracking", "keyboard", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/testimonial-ring",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "@number-flow/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "title", type: "string", default: "'In their own words.'" },
		{ name: "testimonials", type: "RingTestimonial[]", default: "DEFAULT_TESTIMONIALS" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
