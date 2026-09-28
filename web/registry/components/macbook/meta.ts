import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "macbook",
	title: "Macbook",
	description: "",
	interaction: "",
	categories: ["3D & Canvas"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/macbook-scroll",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["tool-tip"],
	props: [
		{ name: "src", type: "string" },
		{ name: "showGradient", type: "boolean" },
		{ name: "title", type: "React.ReactNode" },
		{ name: "badge", type: "React.ReactNode" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
