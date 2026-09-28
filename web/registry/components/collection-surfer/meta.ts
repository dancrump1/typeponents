import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "collection-surfer",
	title: "Collection Surfer",
	description:
		"Full-screen gallery of collection photos strung along a diagonal line receding into 3D depth.",
	interaction:
		"Scrolling flies the line of images past the camera and loops back on itself so it never runs out; moving the pointer across the scene swells the cards nearest it and lets them settle as the pointer moves on.",
	categories: ["Cards"],
	tags: ["spring", "scroll-driven", "hover", "cursor-tracking"],
	inspiration: {
		source: "Componentry",
		url: "https://www.componentry.fun/docs/components/collection-surfer",
		authorUrl: "https://www.componentry.fun",
		relationship: "adaptation",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "CollectionItem[]", default: "ITEMS" },
		{ name: "variant", type: "CollectionSurferVariant", default: "\"magnetic\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
