import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dual-ring-loader",
	title: "Dual Ring Loader",
	description:
		"Loading spinner built from two concentric rings, each with a gap in its outline, the smaller one nested inside the larger.",
	interaction:
		"Runs on its own — the two rings turn in opposite directions at different speeds and dip slightly smaller at the start of each turn, so their gaps keep drifting out of alignment.",
	categories: ["Loaders"],
	tags: [],
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	notes: "2 demos: demo.tsx, demo-dualringspinnerloader.tsx.",
});
