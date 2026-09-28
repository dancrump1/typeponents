import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "frequency",
	title: "Frequency",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["spring", "autoplay"],
	inspiration: {
		source: "ground.bossadizenith.me",
		url: "https://ground.bossadizenith.me/docs/components/cards/frequency",
		relationship: "adaptation",
	},
	dependencies: ["framer-motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
