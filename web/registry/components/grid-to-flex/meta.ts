import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "grid-to-flex",
	title: "Grid To Flex",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: [],
	inspiration: {
		source: "ground.bossadizenith.me",
		url: "https://ground.bossadizenith.me/docs/components/layouts/grid-to-flex",
		relationship: "adaptation",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
