import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "curtain-reveal-card",
	title: "Curtain Reveal Card",
	description: "",
	interaction: "",
	categories: ["Cards"],
	tags: ["hover"],
	inspiration: {
		source: "systaliko-ui.vercel.app",
		url: "https://systaliko-ui.vercel.app/docs/cards/card-curtain-reveal",
		relationship: "adaptation",
	},
	dependencies: ["clsx", "lucide-react"],
	registryDependencies: ["button"],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
