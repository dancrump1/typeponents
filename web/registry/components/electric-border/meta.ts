import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "electric-border",
	title: "Electric Border",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["autoplay", "responsive"],
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "color", type: "string", default: "\"#5227FF\"" },
		{ name: "speed", type: "number", default: "1" },
		{ name: "chaos", type: "number", default: "1" },
		{ name: "thickness", type: "number", default: "2" },
		{ name: "className", type: "string" },
		{ name: "style", type: "React.CSSProperties" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
