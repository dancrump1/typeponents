import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "faq-section",
	title: "FAQ Section",
	description: "",
	interaction: "",
	categories: ["Accordions"],
	tags: ["hover"],
	inspiration: {
		source: "Eclair UI",
		url: "https://eclairui.gopx.dev/components/faq-sections",
		authorUrl: "https://eclairui.gopx.dev",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "faqs", type: "FAQData", default: "faqData" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
