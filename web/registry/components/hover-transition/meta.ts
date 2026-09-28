import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hover-transition",
	title: "Hover Transition",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["hover", "cursor-tracking", "responsive"],
	inspiration: {
		source: "Componentry",
		url: "https://componentry.dev/docs/components/hover-transition",
		authorUrl: "https://componentry.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "defaultComponent", type: "React.ReactNode" },
		{ name: "hoverComponent", type: "React.ReactNode" },
		{ name: "effect", type: "\"wipe\" | \"ripple\" | \"parallax\" | \"curtain\" | \"diagonal\" |…", default: "\"wipe\"" },
		{ name: "direction", type: "\"top\" | \"right\" | \"bottom\" | \"left\" | \"top-left\" | \"top-r…", default: "\"right\"" },
		{ name: "duration", type: "number", default: "0.72" },
		{ name: "easing", type: "string", default: "\"cubic-bezier(0.22, 1, 0.36, 1)\"" },
		{ name: "label", type: "string", default: "\"Interactive hover transition\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
