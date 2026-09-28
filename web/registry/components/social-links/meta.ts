import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "social-links",
	title: "Social Links",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["hover"],
	inspiration: {
		source: "21st.dev",
		url: "https://21st.dev/serafimcloud/social-links/default",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "socials", type: "Social[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
