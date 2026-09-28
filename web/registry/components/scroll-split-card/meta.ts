import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scroll-split-card",
	title: "Scroll Split Card",
	description:
		"Tall scroll section where a single wide photo is secretly three panels that pull apart and flip over into content cards.",
	interaction:
		"Scrolling fades out a scroll-down hint, slides the outer panels apart and shrinks all three slightly, then flips them over into coloured cards with an icon, title and text; they fan out and drift upward as a closing line fades in beneath them.",
	categories: ["Scroll"],
	tags: ["featured", "scroll-driven"],
	inspiration: {
		source: "Componentry",
		url: "https://www.componentry.fun/docs/components/scroll-split-card",
		authorUrl: "https://www.componentry.fun",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "imageSrc", type: "string", required: true },
		{ name: "cards", type: "ScrollSplitCardItem[]", required: true },
		{ name: "className", type: "string" },
		{ name: "containerRef", type: "RefObject<HTMLElement | null>" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 9,
	status: "needs-review",
});
