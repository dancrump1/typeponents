import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-cursor",
	title: "Text Cursor",
	description: "Pointer trail that drops a repeating character or emoji along the path of the cursor.",
	interaction:
		"Moving the pointer leaves a short line of characters behind it, each one tilted to follow the direction of travel and drifting gently in place; they fade away one by one once you stop moving.",
	categories: ["Text", "Text Animations"],
	tags: ["cursor-tracking", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/text-animations/text-cursor",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "\"⚛️\"" },
		{ name: "delay", type: "number", default: "0.01" },
		{ name: "spacing", type: "number", default: "100" },
		{ name: "followMouseDirection", type: "boolean", default: "true" },
		{ name: "randomFloat", type: "boolean", default: "true" },
		{ name: "exitDuration", type: "number", default: "0.5" },
		{ name: "removalInterval", type: "number", default: "30" },
		{ name: "maxPoints", type: "number", default: "5" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
