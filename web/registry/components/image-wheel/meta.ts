import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "image-wheel",
	title: "Image Wheel",
	description: "",
	interaction: "",
	categories: ["Media Galleries", "Images"],
	tags: ["spring", "drag"],
	inspiration: {
		source: "pro.bossadizenith.me",
		url: "https://pro.bossadizenith.me/",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
