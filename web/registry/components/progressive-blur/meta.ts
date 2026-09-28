import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "progressive-blur",
	title: "Progressive Blur",
	description:
		"Layered blur overlay that ramps from clear to fully blurred across one chosen edge of whatever sits behind it.",
	interaction:
		"Static on its own, holding a soft blur over an image edge so caption text stays readable; in the demo the second image fades its blur and caption in on hover and back out when the pointer leaves.",
	categories: ["Backgrounds"],
	tags: [],
	inspiration: {
		source: "Motion Primitives",
		url: "https://motion-primitives.com/docs/progressive-blur",
		authorUrl: "https://motion-primitives.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "direction", type: "\"top\" | \"right\" | \"bottom\" | \"left\"", default: "\"bottom\"" },
		{ name: "blurLayers", type: "number", default: "8" },
		{ name: "className", type: "string" },
		{ name: "blurIntensity", type: "number", default: "0.25" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
