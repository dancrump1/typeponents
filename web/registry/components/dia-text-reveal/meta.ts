import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dia-text-reveal",
	title: "Dia Text Reveal",
	description: "",
	interaction: "",
	categories: ["Text"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "Magic UI",
		url: "https://magicui.design/docs/components/dia-text-reveal",
		authorUrl: "https://magicui.design",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string | string[]", description: "Text to reveal. Pass multiple strings to rotate when {@link DiaTextRevealProps.repeat} is `true`.", required: true },
		{ name: "colors", type: "string[]", default: "DEFAULT_COLORS", description: "Colors sampled across the moving gradient band. Defaults to a built-in palette." },
		{ name: "textColor", type: "string", default: "\"var(--foreground)\"", description: "CSS color for revealed text after the sweep and for leading/trailing regions during the animation." },
		{ name: "duration", type: "number", default: "1.5", description: "Duration of one sweep pass, in seconds." },
		{ name: "delay", type: "number", default: "0", description: "Delay before the sweep starts, in seconds." },
		{ name: "repeat", type: "boolean", default: "false", description: "When `text` is an array, replay the sweep and advance to the next string after each completion." },
		{ name: "repeatDelay", type: "number", default: "0.5", description: "Pause between cycles when {@link DiaTextRevealProps.repeat} is `true`, in seconds." },
		{ name: "startOnView", type: "boolean", default: "true", description: "If `true`, the animation starts only after the element enters the viewport." },
		{ name: "once", type: "boolean", default: "true", description: "Passed to `useInView`: if `true`, in-view detection fires at most once (no replay on scroll-back)." },
		{ name: "className", type: "string", description: "Additional class names for the animated `span` (e.g. typography utilities)." },
		{ name: "fixedWidth", type: "boolean", default: "false", description: "When `text` has multiple entries, use the widest string’s width for layout instead of animating width per line." },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
