import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scroll-reveal",
	title: "Scroll Reveal",
	description:
		"Large block of heading text that sits at a slight tilt and straightens as it scrolls into view, its words going from faint and blurred to solid.",
	interaction:
		"Scrolling is the only trigger: the text rotates upright as it enters the viewport, and the words clear up one after another from left to right, reversing if you scroll back up.",
	categories: ["Text Animations"],
	tags: ["scroll-driven"],
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [
		{ name: "scrollContainerRef", type: "React.RefObject<HTMLElement>" },
		{ name: "enableBlur", type: "boolean", default: "true" },
		{ name: "baseOpacity", type: "number", default: "0.1" },
		{ name: "baseRotation", type: "number", default: "3" },
		{ name: "blurStrength", type: "number", default: "4" },
		{ name: "containerClassName", type: "string", default: "\"\"" },
		{ name: "textClassName", type: "string", default: "\"\"" },
		{ name: "rotationEnd", type: "string", default: "\"bottom bottom\"" },
		{ name: "wordAnimationEnd", type: "string", default: "\"bottom bottom\"" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
