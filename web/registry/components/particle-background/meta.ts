import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "particle-background",
	title: "Particle Background",
	description: "",
	interaction: "",
	categories: ["Backgrounds"],
	tags: ["canvas", "autoplay"],
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
