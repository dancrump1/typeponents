import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "list-rotator",
	title: "List Rotator",
	description: "",
	interaction: "",
	categories: ["Data & Tables"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "GitHub",
		url: "https://github.com/PhanDangKhoa96/ui-collections",
		author: "PhanDangKhoa96",
		authorUrl: "https://github.com/PhanDangKhoa96",
		relationship: "adaptation",
	},
	dependencies: ["gsap", "lenis", "styled-components"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
