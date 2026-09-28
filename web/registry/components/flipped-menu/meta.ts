import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "flipped-menu",
	title: "Flipped Menu",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["hover"],
	dependencies: ["@gsap/react", "gsap", "splitting"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
