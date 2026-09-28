import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "container-scroll",
	title: "Container Scroll",
	description:
		"Heading above a large device-style frame, tipped back in 3D, holding a grid of profile cards.",
	interaction:
		"As you scroll past the section the frame rotates up from tipped-back toward flat and grows to fill the space, while the heading and the cards inside drift upward, as if the screen were standing up to face you.",
	categories: ["3D & Canvas"],
	tags: ["scroll-driven", "hover"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/container-scroll-animation",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "users", type: "{ name: string; designation: string; image: string; badge…", required: true },
		{ name: "titleComponent", type: "React.ReactNode", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
