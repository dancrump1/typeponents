import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "particle-galaxy",
	title: "Particle Galaxy",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["featured", "webgl", "canvas", "cursor-tracking", "autoplay", "responsive"],
	dependencies: ["three"],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "message", type: "string", default: "\"Interactive WebGL content is unavail…" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 9,
	status: "needs-review",
});
