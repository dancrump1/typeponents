import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "split-flap-display",
	title: "Split Flap Display",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["canvas", "autoplay", "responsive"],
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "fit", type: "SplitFlapDisplayFit", default: "\"contain\"" },
		{ name: "className", type: "string" },
		{ name: "style", type: "CSSProperties" },
		{ name: "config", type: "{ cols?: number; rows?: number; cellAspectRatio?: number;…" },
		{ name: "content", type: "SplitFlapDisplayContent" },
		{ name: "ariaLabel", type: "string", default: "\"Split flap display\"" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
