import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "svg-follow-scroll",
	title: "SVG Follow Scroll",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX", "Scroll"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "comgio.ai",
		url: "https://comgio.ai/",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string", required: true },
		{ name: "scrollYProgress", type: "any", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
