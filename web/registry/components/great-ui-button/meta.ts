import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "great-ui-button",
	title: "Button",
	description: "A versatile button component supporting multiple variants, sizes, icons, and a loading state.",
	interaction: "Clickable element with hover, active, focus, and loading states.",
	categories: ["Buttons"],
	tags: ["hover"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/button",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
