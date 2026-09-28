import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "masonry",
	title: "Masonry",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["scroll-driven", "autoplay", "responsive"],
	inspiration: {
		source: "GitHub",
		url: "https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx",
		author: "radix-ui",
		authorUrl: "https://github.com/radix-ui",
		relationship: "adaptation",
	},
	dependencies: ["@radix-ui/react-slot"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
