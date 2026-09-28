import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "stripes-preloader",
	title: "Stripes Preloader",
	description: "",
	interaction: "",
	categories: ["Loaders"],
	tags: ["scroll-driven", "responsive"],
	inspiration: {
		source: "React Bits",
		url: "https://reactbits.dev/components/stripes-preloader",
		authorUrl: "https://reactbits.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "tileClassName", type: "string" },
		{ name: "minTileWidth", type: "number", default: "32" },
		{ name: "animationDuration", type: "number", default: "0.5" },
		{ name: "animationDelay", type: "number", default: "1" },
		{ name: "stagger", type: "number", default: "0.05" },
		{ name: "rerun", type: "boolean" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
