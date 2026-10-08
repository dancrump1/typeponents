import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "pricing-plan-switch",
	title: "Pricing Plan Switch",
	description: "A pricing section where picking a plan morphs the name badge, crossfades the description and spins the price with Number Flow, while the checklist lights up its included rows. A monthly/yearly toggle re-spins the price.",
	interaction: "Picking a plan morphs the badge, crossfades the description, and spins the price. The monthly and yearly toggle re-spins the price and lights up the included features.",
	categories: ["Cards"],
	tags: ["hover", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/pricing-plan-switch",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "@number-flow/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "plans", type: "PricingPlan[]", default: "DEFAULT_PLANS", description: "Plans shown in the selector. Defaults to a 3-tier sample." },
		{ name: "features", type: "string[]", default: "DEFAULT_FEATURES", description: "Feature checklist; each plan lights up its first `includedCount` rows." },
		{ name: "eyebrow", type: "string", default: "'Pricing'", description: "Eyebrow badge above the heading." },
		{ name: "heading", type: "string", default: "'Simple pricing that scales with you'", description: "Section heading." },
		{ name: "description", type: "string", default: "'Upgrade anytime as your needs evolve…", description: "Section sub-heading." },
		{ name: "currency", type: "string", default: "'$'", description: "Currency symbol shown before the price." },
		{ name: "ctaText", type: "string", default: "'Get started'", description: "Primary CTA label." },
		{ name: "ctaHref", type: "string", default: "'#'", description: "Primary CTA link." },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
