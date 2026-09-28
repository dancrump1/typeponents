import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-parallax-content",
	title: "Text Parallax Content",
	description: "",
	interaction: "",
	categories: ["Text", "Text Animations"],
	tags: ["scroll-driven", "hover"],
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [
		{ name: "imgUrl", type: "string", required: true },
		{ name: "subheading", type: "string", required: true },
		{ name: "heading", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
