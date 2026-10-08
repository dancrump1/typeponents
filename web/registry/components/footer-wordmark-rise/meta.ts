import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "footer-wordmark-rise",
	title: "Footer Wordmark Rise",
	description: "A dark site footer that rises into view over a glow swelling off the bottom edge, closed by a giant wordmark fitted to the column whose letters climb out of their masks one by one.",
	interaction: "As the footer comes into view, the link rows rise in and the brand name lifts out of the baseline letter by letter. Link labels roll on hover while an underline slides through.",
	categories: ["Footers"],
	tags: ["scroll-driven", "hover", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/footer-wordmark-rise",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "brand", type: "string", default: "'Tween UI'" },
		{ name: "logo", type: "ReactNode", default: "TWEEN_MARK" },
		{ name: "description", type: "string", default: "'GSAP & CSS animated components for R…" },
		{ name: "columns", type: "FooterColumn[]", default: "DEFAULT_COLUMNS" },
		{ name: "socials", type: "FooterSocial[]", default: "DEFAULT_SOCIALS" },
		{ name: "legal", type: "FooterLink[]", default: "DEFAULT_LEGAL" },
		{ name: "copyright", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
