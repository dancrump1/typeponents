import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "follow-cursor",
	title: "Follow Cursor",
	description: "",
	interaction: "",
	categories: ["Cursor & Pointer Effects"],
	tags: ["spring", "cursor-tracking"],
	inspiration: {
		source: "Spark UI",
		url: "https://www.sparkui.site/components/mouse-follower",
		authorUrl: "https://www.sparkui.site",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
