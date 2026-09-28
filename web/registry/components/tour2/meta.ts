import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tour2",
	title: "Tour2",
	description: "",
	interaction: "",
	categories: ["Utilities"],
	tags: ["responsive"],
	inspiration: {
		source: "onboarding-tour.vercel.app",
		url: "https://onboarding-tour.vercel.app/",
		relationship: "adaptation",
	},
	dependencies: ["@radix-ui/react-popover", "lucide-react"],
	registryDependencies: ["button", "card", "popover"],
	props: [
		{ name: "tours", type: "Tour[]", required: true },
		{ name: "onTourEnd", type: "(() => void)" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
