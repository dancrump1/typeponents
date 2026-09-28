import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "team-section",
	title: "Team Section",
	description: "A premium interactive team listing component featuring custom layout reveals, grayscale-to-color hover effects, and responsive layout.",
	interaction: "Hover-triggered grayscale-to-color active states, slide-in designations, and absolute floating team member image preview.",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/team-section",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
