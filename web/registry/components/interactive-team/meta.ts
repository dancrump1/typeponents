import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "interactive-team",
	title: "Interactive Team",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: [],
	inspiration: {
		source: "emerald-ui.com",
		url: "https://emerald-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "teamMembers", type: "TeamMember[]", required: true },
		{ name: "title", type: "string", default: "'Dream Team'" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
