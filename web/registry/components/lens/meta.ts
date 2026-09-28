import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "lens",
	title: "Lens",
	description: "",
	interaction: "",
	categories: ["3D & Canvas"],
	tags: ["hover", "cursor-tracking"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "zoomFactor", type: "number", default: "2" },
		{ name: "lensSize", type: "number", default: "370" },
		{ name: "position", type: "{ x: number; y: number; }", default: "{ x: 200, y: 150 }" },
		{ name: "isStatic", type: "boolean", default: "false" },
		{ name: "isFocusing", type: "(() => void)" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
