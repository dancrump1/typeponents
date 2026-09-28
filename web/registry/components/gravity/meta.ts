import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "gravity",
	title: "Gravity",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["spring", "autoplay"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/physics/gravity",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["matter-js", "poly-decomp"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
