import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "cielia-replication",
	title: "Cielia Replication",
	description: "",
	interaction: "",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	dependencies: ["@gsap/react", "gsap", "lenis", "lottie-web", "tempus"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	notes: "4 demos: demo.tsx, demo-improvements.tsx, demo-introduction.tsx, demo-lottiescrolltrigger.tsx.",
});
