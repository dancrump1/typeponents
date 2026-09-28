import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "nav-bar",
	title: "Nav Bar",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["hover"],
	dependencies: ["react-inlinesvg"],
	registryDependencies: ["mobile-nav", "theme-changer"],
	props: [
		{ name: "header", type: "any", required: true },
		{ name: "routes", type: "ApiRouteType[]", default: "[]" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
