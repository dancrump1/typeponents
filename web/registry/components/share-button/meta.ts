import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "share-button",
	title: "Share Button",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["hover"],
	dependencies: ["lucide-react"],
	registryDependencies: ["button"],
	props: [
		{ name: "links", type: "ShareLink[]", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
