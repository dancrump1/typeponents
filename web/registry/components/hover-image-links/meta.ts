import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hover-image-links",
	title: "Hover Image Links",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["spring", "hover", "cursor-tracking"],
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [
		{ name: "heading", type: "string", required: true },
		{ name: "imgSrc", type: "string", required: true },
		{ name: "subheading", type: "string", required: true },
		{ name: "href", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
