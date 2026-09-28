import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "backlight",
	title: "Backlight",
	description:
		"Wrapper that casts a blurred, oversaturated copy of its contents outward as a glow.",
	interaction:
		"Static — the glow is taken from the content itself when the page loads and does not respond to input.",
	categories: ["Backgrounds"],
	tags: [],
	inspiration: {
		source: "Magic UI",
		url: "https://magicui.design/docs/components/backlight",
		authorUrl: "https://magicui.design",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string" },
		{ name: "blur", type: "number", default: "20" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
