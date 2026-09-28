import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "parallax-floating",
	title: "Parallax Floating",
	description: "",
	interaction: "",
	categories: ["Media Galleries", "Images", "Cursor & Pointer Effects", "Grids & Layouts"],
	tags: ["autoplay"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/image/parallax-floating",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["text-rotate"],
	props: [
		{ name: "className", type: "string" },
		{ name: "sensitivity", type: "number", default: "1" },
		{ name: "easingFactor", type: "number", default: "0.05" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
