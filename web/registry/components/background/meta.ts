import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "background",
	title: "Background",
	description:
		"Full-screen hero image with a tint overlay, loaded at whichever size suits the viewport.",
	interaction:
		"Static layout — the image is picked to match the screen width on load and does not respond to input.",
	categories: ["Backgrounds"],
	tags: [],
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
