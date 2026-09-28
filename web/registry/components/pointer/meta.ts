import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "pointer",
	title: "Pointer",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["cursor-tracking"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	notes: "2 demos: demo.tsx, demo-pointerdemo.tsx.",
});
