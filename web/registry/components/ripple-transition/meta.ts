import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "ripple-transition",
	title: "Ripple Transition",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["webgl", "canvas", "cursor-tracking", "keyboard", "autoplay", "responsive"],
	inspiration: {
		source: "Componentry",
		url: "https://componentry.dev/docs/components/ripple-transition",
		authorUrl: "https://componentry.dev",
		relationship: "adaptation",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "message", type: "string", default: "\"Interactive WebGL content is unavail…" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
