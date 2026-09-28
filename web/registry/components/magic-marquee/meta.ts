import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "magic-marquee",
	title: "Marquee",
	description: "An infinite scrolling component that can be used to display text, images, or videos.",
	interaction: "",
	categories: ["Carousels"],
	tags: [],
	inspiration: {
		source: "Magic UI",
		url: "https://magicui.design/docs/components/marquee",
		authorUrl: "https://magicui.design",
		relationship: "port",
	},
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "draft",
	notes: "demo.tsx is an intake scaffold — replace it with a real usage example.",
});
