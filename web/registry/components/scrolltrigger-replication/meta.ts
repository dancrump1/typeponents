import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scrolltrigger-replication",
	title: "Scrolltrigger Replication",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	dependencies: ["@gsap/react", "clsx", "gsap", "lenis", "tempus"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
