import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "magic-avatar-circles",
	title: "Avatar Circles",
	description: "Overlapping circles of avatars.",
	interaction: "",
	categories: ["Images"],
	tags: [],
	inspiration: {
		source: "Magic UI",
		url: "https://magicui.design/docs/components/avatar-circles",
		authorUrl: "https://magicui.design",
		relationship: "port",
	},
	dependencies: [],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "draft",
	notes: "demo.tsx is an intake scaffold — replace it with a real usage example.",
});
