import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "film-reel",
	title: "Film Reel",
	description: "",
	interaction: "",
	categories: ["Media Galleries"],
	tags: ["scroll-driven", "hover", "cursor-tracking", "autoplay"],
	inspiration: {
		source: "Serenity UI",
		url: "https://www.serenity-ui.com/components/filmroll",
		authorUrl: "https://www.serenity-ui.com",
		relationship: "adaptation",
	},
	dependencies: ["lodash", "motion"],
	registryDependencies: [],
	props: [
		{ name: "videos", type: "string[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
