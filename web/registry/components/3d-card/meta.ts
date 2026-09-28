import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "3d-card",
	title: "3D Card",
	description:
		"Card wrapper that tilts in 3D toward the pointer, with its text and image layered at different depths.",
	interaction:
		"Moving the pointer across the card tilts it to follow, and the title, image and buttons lift forward off the surface; the card snaps flat again when the pointer leaves.",
	categories: ["Cards", "3D & Canvas"],
	tags: ["featured", "hover", "cursor-tracking"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/3d-card-effect",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "containerClassName", type: "string" },
		{ name: "id", type: "string" },
		{ name: "title", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 9,
	status: "needs-review",
});
