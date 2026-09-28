import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "bubble-menu",
	title: "Bubble Menu",
	description:
		"Floating navigation bar of a logo bubble and a hamburger button that opens a full-screen grid of tilted menu pills.",
	interaction:
		"Clicking the hamburger crosses its bars into an X and pops the pills in one after another, each springing up from nothing with its label rising into place; hovering a pill tilts it further and floods it with its own colour.",
	categories: ["Navigation"],
	tags: [],
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [
		{ name: "logo", type: "ReactNode", required: true },
		{ name: "onMenuClick", type: "((open: boolean) => void)" },
		{ name: "className", type: "string" },
		{ name: "style", type: "CSSProperties" },
		{ name: "menuAriaLabel", type: "string", default: "\"Toggle menu\"" },
		{ name: "menuBg", type: "string", default: "\"#fff\"" },
		{ name: "menuContentColor", type: "string", default: "\"#111\"" },
		{ name: "useFixedPosition", type: "boolean", default: "false" },
		{ name: "items", type: "MenuItem[]" },
		{ name: "animationEase", type: "string", default: "\"back.out(1.5)\"" },
		{ name: "animationDuration", type: "number", default: "0.5" },
		{ name: "staggerDelay", type: "number", default: "0.12" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
