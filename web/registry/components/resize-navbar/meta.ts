import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "resize-navbar",
	title: "Resize Navbar",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["scroll-driven", "hover", "theme-aware"],
	dependencies: ["motion", "next-themes", "react-icons"],
	registryDependencies: ["button", "following-eyes", "theme-animations"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
