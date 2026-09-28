import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "jelly-loader",
	title: "Jelly Loader",
	description: "A loading animation with circles that move and scale like jelly. Perfect for showing that something is loading on your website.",
	interaction: "Colored blobs scale and overlap in a looping jelly motion.",
	categories: ["Loaders"],
	tags: [],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/jellyloader",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "numberOfCubes", type: "number", default: "8" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
