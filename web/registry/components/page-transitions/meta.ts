import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "page-transitions",
	title: "Page Transitions",
	description: "",
	interaction: "",
	categories: ["Utilities"],
	tags: ["hover"],
	dependencies: ["@gsap/react", "gsap", "next-transition-router", "split-type"],
	registryDependencies: ["scrolltrigger-replication"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
