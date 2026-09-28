import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "image-reveal",
	title: "Image Reveal",
	description: "",
	interaction: "",
	categories: ["Images"],
	tags: ["hover", "cursor-tracking", "autoplay", "responsive"],
	inspiration: {
		source: "UI Layouts",
		url: "https://www.ui-layouts.com/components/image-reveal",
		authorUrl: "https://www.ui-layouts.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "usehooks-ts"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
