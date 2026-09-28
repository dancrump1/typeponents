import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "target-cursor",
	title: "Target Cursor",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["cursor-tracking", "autoplay"],
	inspiration: {
		source: "React Bits",
		url: "https://www.reactbits.dev/animations/target-cursor",
		authorUrl: "https://www.reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [
		{ name: "targetSelector", type: "string", default: "\".cursor-target\"" },
		{ name: "spinDuration", type: "number", default: "2" },
		{ name: "hideDefaultCursor", type: "boolean", default: "true" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
