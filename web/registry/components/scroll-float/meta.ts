import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "scroll-float",
	title: "Scroll Float",
	description: "",
	interaction: "",
	categories: ["Text Animations"],
	tags: ["scroll-driven"],
	dependencies: ["gsap"],
	registryDependencies: [],
	props: [
		{ name: "scrollContainerRef", type: "React.RefObject<HTMLElement>" },
		{ name: "containerClassName", type: "string", default: "\"\"" },
		{ name: "textClassName", type: "string", default: "\"\"" },
		{ name: "animationDuration", type: "number", default: "1" },
		{ name: "ease", type: "string", default: "\"back.inOut(2)\"" },
		{ name: "scrollStart", type: "string", default: "\"center bottom+=50%\"" },
		{ name: "scrollEnd", type: "string", default: "\"bottom bottom-=40%\"" },
		{ name: "stagger", type: "number", default: "0.03" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
