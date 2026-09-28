import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "swap-logos",
	title: "Swap Logos",
	description: "",
	interaction: "",
	categories: ["Images"],
	tags: [],
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [
		{ name: "top", type: "React.ReactNode", required: true },
		{ name: "bottom", type: "React.ReactNode", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
