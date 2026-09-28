import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-on-path-scroll",
	title: "Text On Path Scroll",
	description: "A scroll-driven text animation that follows a custom SVG path as the user scrolls.",
	interaction: "Scroll-driven text offset animation along an SVG path.",
	categories: ["Text Animations"],
	tags: ["spring", "scroll-driven"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/text-on-path-scroll",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "\"CRAFTING BEAUTIFUL DIGITAL EXPERIENC…", description: "The text to display on the path.\r\nRecommend appending special characters like • or · between repetitions." },
		{ name: "className", type: "string", description: "Additional CSS classes to apply to the container." },
		{ name: "scrollContainerRef", type: "React.RefObject<HTMLElement | null>", description: "Optional ref for a custom scroll container (e.g. for preview panels)." },
		{ name: "path", type: "React.ReactNode", default: "( <svg viewBox=\"0 0 2207 208\" classNa…", description: "The SVG element containing the path. Must include a <path id=\"scroll-path\" />." },
		{ name: "textProps", type: "React.SVGProps<SVGTextElement>", description: "Additional props to pass to the `<text>` SVG element. Useful for changing fontSize." },
		{ name: "scrollOffsets", type: "[string | number, string | number]", default: "[2500, -8000]", description: "The start and end scroll offsets for the text along the path." },
		{ name: "springOptions", type: "SpringOptions", default: "{ stiffness: 50, damping: 20, restDel…", description: "Options for the spring animation that smooths the scroll progress." },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
