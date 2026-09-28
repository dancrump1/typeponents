import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "pixel-image",
	title: "Pixel Image",
	description: "",
	interaction: "",
	categories: ["Images"],
	tags: ["drag"],
	inspiration: {
		source: "Magic UI",
		url: "https://magicui.design/docs/components/pixel-image",
		authorUrl: "https://magicui.design",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
