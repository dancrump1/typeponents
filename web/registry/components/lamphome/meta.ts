import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "lamphome",
	title: "Lamphome",
	description: "",
	interaction: "",
	categories: ["Special Effects & FX"],
	tags: ["spring", "drag", "hover", "theme-aware"],
	inspiration: {
		source: "ScrollX UI",
		url: "https://scrollxui.dev/docs/components/lamphome",
		authorUrl: "https://scrollxui.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion", "next-themes"],
	registryDependencies: ["button"],
	props: [
		{ name: "title", type: "string" },
		{ name: "description", type: "string" },
		{ name: "logoSrc", type: "string" },
		{ name: "logoAlt", type: "string" },
		{ name: "navItems", type: "NavItem[]", default: "[]" },
		{ name: "className", type: "string", default: "''" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
