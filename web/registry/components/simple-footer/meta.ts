import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "simple-footer",
	title: "Simple Footer",
	description: "",
	interaction: "",
	categories: ["Footers"],
	tags: ["hover"],
	dependencies: ["lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "brandName", type: "string" },
		{ name: "navigationLinks", type: "SimpleFooterLink[]" },
		{ name: "socialLinks", type: "SimpleFooterSocialLink[]" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
