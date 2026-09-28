import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "content-with-image",
	title: "Content With Image",
	description:
		"Two-column marketing section pairing a heading and paragraph with a full-height photo beside them.",
	interaction:
		"Static layout — the text and image sit side by side with no motion, and stack into a single column on narrow screens.",
	categories: ["Grids & Layouts"],
	tags: [],
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
