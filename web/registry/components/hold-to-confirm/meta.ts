import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hold-to-confirm",
	title: "Hold To Confirm",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: [],
	inspiration: {
		source: "ScrollX UI",
		url: "https://scrollxui.dev/docs/components/hold-toconfirm",
		authorUrl: "https://scrollxui.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["button"],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
