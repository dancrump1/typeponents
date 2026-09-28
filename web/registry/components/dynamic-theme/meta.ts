import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "dynamic-theme",
	title: "Dynamic Theme",
	description:
		"Sticky top navigation that recolours itself to stay legible over alternating light and dark page sections.",
	interaction:
		"As you scroll from one section to the next, every nav link fades between dark and light text to suit the background behind it, and the link for the section you are in brightens to full strength. Clicking a link scrolls smoothly to that section.",
	categories: ["Special Effects & FX"],
	tags: ["scroll-driven"],
	inspiration: {
		source: "edil-ozi.pro",
		url: "https://www.edil-ozi.pro/docs/components/dynamic-theme",
		relationship: "adaptation",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
