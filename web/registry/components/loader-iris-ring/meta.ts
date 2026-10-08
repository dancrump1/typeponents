import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "loader-iris-ring",
	title: "Loader Iris Ring",
	description: "A page preloader built around a ring gauge: the arc fills in uneven steps while images flash through its lens and four corner counters sync and go live. Then an iris opens from the lens and the ring flies into the logo in your nav.",
	interaction: "A ring gauge fills in uneven steps while photos flash through its lens and the percentage rolls. At the end an iris opens and the ring flies into the logo.",
	categories: ["Loaders"],
	tags: ["autoplay", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/loader-iris-ring",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "@number-flow/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "modules", type: "LoaderModule[]", default: "DEFAULT_MODULES", description: "Counters in the four corners; each one syncs, counts up and goes live in turn." },
		{ name: "frames", type: "string[]", default: "DEFAULT_FRAMES", description: "Images flashed through the lens while the gauge fills." },
		{ name: "status", type: "Record<Status, string>", default: "DEFAULT_STATUS", description: "Words for a module's three states." },
		{ name: "caption", type: "{ loading: string; done: string; }", default: "DEFAULT_CAPTION", description: "Caption under the percentage, while loading and once done." },
		{ name: "fullscreen", type: "boolean", default: "false", description: "Cover the whole viewport and lock page scroll, instead of filling this section." },
		{ name: "onComplete", type: "(() => void)", description: "Fires as the iris opens and the page settles in." },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
