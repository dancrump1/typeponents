import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "tabs-transition-panel",
	title: "Tabs Transition Panel",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["hover"],
	dependencies: ["framer-motion", "html-react-parser", "motion", "react-inlinesvg"],
	registryDependencies: ["content-with-image", "cursor-mask", "infinite-scrolling-logos-animation", "marquee-along-svg", "opposite-scroll-links", "parallax-floating", "preloader", "scroll-velocity", "target-cursor", "text-rotate"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
