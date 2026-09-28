import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "echo-text",
	title: "Echo Text",
	description:
		"Oversized headline trailed by a stack of tinted, progressively blurrier copies of itself, like a motion echo.",
	interaction:
		"On load the copies are fanned out to one side and slide in behind the headline one after another. Moving the pointer near the text drags the stack out again toward the cursor, each copy lagging further behind and fading as the gap opens.",
	categories: ["Text Animations"],
	tags: ["hover", "cursor-tracking", "autoplay", "responsive"],
	inspiration: {
		source: "React Bits",
		url: "https://reactbits.dev/text-animations/echo-text",
		authorUrl: "https://reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "'Motion Echo'" },
		{ name: "echoes", type: "number", default: "12" },
		{ name: "lag", type: "number", default: "0.24" },
		{ name: "offset", type: "number", default: "36" },
		{ name: "direction", type: "Direction", default: "'right'" },
		{ name: "fade", type: "number", default: "0.72" },
		{ name: "blur", type: "number", default: "3" },
		{ name: "tint", type: "string | false", default: "'#7dd3fc'" },
		{ name: "mode", type: "Mode", default: "'both'" },
		{ name: "cursorRadius", type: "number", default: "320" },
		{ name: "duration", type: "number", default: "900" },
		{ name: "ease", type: "Ease", default: "'ease-out'" },
		{ name: "fontSize", type: "string | number", default: "'clamp(3rem, 9vw, 7rem)'" },
		{ name: "fontWeight", type: "string | number", default: "800" },
		{ name: "color", type: "string", default: "'#f8fafc'" },
		{ name: "className", type: "string", default: "''" },
		{ name: "style", type: "React.CSSProperties" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
