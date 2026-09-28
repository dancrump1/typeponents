import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "vinyl-album-card",
	title: "Vinyl Album Card",
	description: "An interactive music album card with a spinning vinyl record that emerges from the cover sleeve upon hover.",
	interaction: "Hover-triggered card sleeve scale, tilt rotations, record sliding offset, and vinyl spin animations.",
	categories: ["Cards"],
	tags: ["spring", "hover", "theme-aware"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/vinyl-album-card",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["framer-motion", "motion", "next-themes"],
	registryDependencies: [],
	props: [
		{ name: "title", type: "string", default: "\"Crashing Worlds\"" },
		{ name: "artist", type: "string", default: "\"The Bebos\"" },
		{ name: "releaseType", type: "string", default: "\"Single\"" },
		{ name: "year", type: "string", default: "\"2057\"" },
		{ name: "coverImage", type: "string", default: "\"https://ik.imagekit.io/ybq4azred/gre…" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
