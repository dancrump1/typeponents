import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "screen-saver",
	title: "Screen Saver",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["autoplay"],
	inspiration: {
		source: "Fancy Components",
		url: "https://www.fancycomponents.dev/docs/components/blocks/screensaver",
		authorUrl: "https://www.fancycomponents.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "containerRef", type: "React.RefObject<HTMLElement>", required: true },
		{ name: "speed", type: "number", default: "3" },
		{ name: "startPosition", type: "{ x: number; y: number; }", default: "{ x: 0, y: 0 }" },
		{ name: "startAngle", type: "number", default: "45" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
