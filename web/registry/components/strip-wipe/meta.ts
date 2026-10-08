import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "strip-wipe",
	title: "Strip Wipe",
	description: "A split testimonial slider whose photo wipes in as tiled strips beside the quote, the index ticking over on Number Flow. Prev and next reverse the wipe direction.",
	interaction: "The photo wipes in as tiled strips beside the quote. Previous wipes right to left and next wipes left to right. Hover pauses the loop.",
	categories: ["Testimonials"],
	tags: ["hover", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/strip-wipe",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "@number-flow/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "testimonials", type: "TestimonialSlide[]", default: "DEFAULT_TESTIMONIALS", description: "Quotes shown in the split slider. Defaults to a 4-slide sample." },
		{ name: "directional", type: "boolean", default: "true", description: "When true, prev wipes the photo right-to-left and next wipes left-to-right.\nWhen false, every change uses the original right-to-left split." },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
