import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "testimonial-grid",
	title: "Testimonial Grid",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["hover", "autoplay"],
	dependencies: ["lucide-react", "motion"],
	registryDependencies: ["avatar"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
