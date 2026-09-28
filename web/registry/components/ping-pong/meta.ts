import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "ping-pong",
	title: "Ping Pong",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: [],
	dependencies: ["gsap", "react-inlinesvg"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
