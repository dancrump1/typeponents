import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "opposite-scroll",
	title: "Opposite Scroll",
	description:
		"Two-column scroll section pairing stacked text panels on one side with a full-height image column on the other.",
	interaction:
		"As you scroll, the text panels move up the page normally while the image column beside them travels the opposite way through a fixed frame, so each paragraph arrives alongside its own photo.",
	categories: ["Special Effects & FX"],
	tags: ["scroll-driven"],
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "draft",
	notes: "No demo yet.",
});
