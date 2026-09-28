import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "smooth-cursor",
	title: "Smooth Cursor",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["spring", "cursor-tracking", "autoplay"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "cursor", type: "JSX.Element", default: "<DefaultCursorSVG />" },
		{ name: "springConfig", type: "{ damping: number; stiffness: number; mass: number; restD…", default: "{ damping: 45, stiffness: 400, mass: …" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
