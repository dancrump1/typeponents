import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "boids-ecosystem",
	title: "Boids Ecosystem",
	description:
		"Dark canvas backdrop of small coloured triangles that flock together and turn as a group, like birds.",
	interaction:
		"Runs on its own — the flock drifts, splits and regroups without stopping, wrapping around the edges of the frame; moving the pointer over it pushes the nearby birds away, and they close back in once it leaves.",
	categories: ["Backgrounds"],
	tags: ["canvas", "cursor-tracking", "autoplay", "responsive"],
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "count", type: "number", default: "120" },
		{ name: "background", type: "string", default: "\"#0b0b12\"" },
		{ name: "palette", type: "string[]", default: "DEFAULT_PALETTE" },
		{ name: "cursorRadius", type: "number", default: "90" },
		{ name: "attractors", type: "BoidAttractor[]", description: "Force points the flock is drawn toward. Read live, safe to mutate by ref." },
		{ name: "agentsRef", type: "RefObject<BoidAgent[] | null>", description: "Receives the live agents array on mount. Mutate-in-place by the simulation;\r\nread positions from animation frames in the parent (do NOT trigger React state from this)." },
		{ name: "agentShape", type: "\"triangle\" | \"dot\"", default: "\"triangle\"", description: "Triangle reads as flock; dot reads as ambient activity." },
		{ name: "className", type: "string" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
