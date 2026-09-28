import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "image-zoom",
	title: "Image Zoom",
	description: "",
	interaction: "",
	categories: ["Images"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "ui.noxhd.com",
		url: "https://ui.noxhd.com/components/image-zoom/",
		relationship: "adaptation",
	},
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
