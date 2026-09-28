import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "flowing-nav",
	title: "Flowing Nav",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["hover", "cursor-tracking"],
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "MenuItemData[]", default: "[]" },
		{ name: "speed", type: "number", default: "15" },
		{ name: "textColor", type: "string", default: "'#fff'" },
		{ name: "bgColor", type: "string", default: "'#060010'" },
		{ name: "marqueeBgColor", type: "string", default: "'#fff'" },
		{ name: "marqueeTextColor", type: "string", default: "'#060010'" },
		{ name: "borderColor", type: "string", default: "'#fff'" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
