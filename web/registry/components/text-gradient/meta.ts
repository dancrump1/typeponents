import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-gradient",
	title: "Text Gradient",
	description:
		"Hero block whose three headline words take turns lighting up in their own colour gradient, matched by a glowing call-to-action button.",
	interaction:
		"Runs on its own — each word fades from plain white into its gradient and back in turn, and the button behind the call to action glows in the same colour as the word currently lit.",
	categories: ["Text"],
	tags: ["hover"],
	inspiration: {
		source: "GitHub",
		url: "https://github.com/PhanDangKhoa96/ui-collections/blob/main/src/pages/ui-collection/text-gradient-transition.tsx",
		author: "PhanDangKhoa96",
		authorUrl: "https://github.com/PhanDangKhoa96",
		relationship: "adaptation",
	},
	dependencies: ["styled-components"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
