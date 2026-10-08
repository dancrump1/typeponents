import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "loader-line-fold",
	title: "Loader Line Fold",
	description: "A page preloader: the wordmark rises letter by letter while a hairline fills with a counter riding its tip. Once the page is ready the line travels to the middle, folds into a single point, and the page opens out of that point to every edge.",
	interaction: "The wordmark rises letter by letter while a hairline fills and a counter rides its tip. The line then folds into a point and the page opens out of it.",
	categories: ["Loaders"],
	tags: ["autoplay", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/loader-line-fold",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "wordmark", type: "string", default: "'Tween UI'", description: "The word that rises letter by letter." },
		{ name: "location", type: "string", default: "'Local time'", description: "Left of the meta row, before the live clock." },
		{ name: "timeZone", type: "string", description: "IANA time zone for the clock. Defaults to the visitor's own." },
		{ name: "credit", type: "string", description: "Right of the meta row." },
		{ name: "minDuration", type: "number", default: "1.6", description: "Seconds the counter takes to reach 90%, however fast the assets load." },
		{ name: "ready", type: "(() => Promise<unknown>)", description: "Resolves when the page is ready. Defaults to fonts plus every image in `children`." },
		{ name: "fullscreen", type: "boolean", default: "false", description: "Cover the whole viewport and lock page scroll, instead of filling this section." },
		{ name: "onComplete", type: "(() => void)", description: "Fires as the page starts opening out of the centre point." },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
