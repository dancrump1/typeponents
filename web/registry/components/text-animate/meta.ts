import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-animate",
	title: "Text Animate",
	description:
		"Text primitive that reveals a heading by line, word or letter, with presets for fading, blurring, sliding and scaling.",
	interaction:
		"When the text scrolls into view its pieces appear one after another in a quick ripple, each letter or word fading, unblurring, sliding or scaling into place depending on the preset chosen.",
	categories: ["Text Animations"],
	tags: ["spring"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string", description: "The class name to be applied to the component" },
		{ name: "segmentClassName", type: "string", description: "The class name to be applied to each segment" },
		{ name: "delay", type: "number", default: "0", description: "The delay before the animation starts" },
		{ name: "duration", type: "number", default: "0.6", description: "The duration of the animation" },
		{ name: "variants", type: "Variants", description: "Custom motion variants for the animation" },
		{ name: "as", type: "ElementType", description: "The element type to render" },
		{ name: "by", type: "AnimationType", default: "\"character\"", description: "How to split the text (\"text\", \"word\", \"character\")" },
		{ name: "startOnView", type: "boolean", default: "true", description: "Whether to start animation when component enters viewport" },
		{ name: "once", type: "boolean", default: "true", description: "Whether to animate only once" },
		{ name: "animation", type: "AnimationVariant", default: "\"fadeIn\"", description: "The animation preset to use" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
