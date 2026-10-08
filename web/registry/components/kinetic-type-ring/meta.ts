import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "kinetic-type-ring",
	title: "Kinetic Type Ring",
	description: "A phrase wrapped once around a ring in real 3D. A falling dot pulls the letters out of a blur, then drag or scroll spins the ring.",
	interaction: "A phrase wraps once around a 3D ring. A falling dot pulls the letters into focus, then the ring idles and dims the letters as they travel behind. Drag, scroll, or the arrow keys spin it.",
	categories: ["Text Animations"],
	tags: ["drag", "cursor-tracking", "keyboard", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/kinetic-type-ring",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "DEFAULT_TEXT", description: "The phrase wrapped around the ring. It is repeated verbatim, so end it with\nthe same separator it uses inside — otherwise the loop reads with a seam." },
		{ name: "speed", type: "number", default: "14", description: "Idle spin in degrees per second. The front of the text flows leftwards." },
		{ name: "tilt", type: "number", default: "-16", description: "Resting camera tilt in degrees. Negative looks down on the ring." },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
