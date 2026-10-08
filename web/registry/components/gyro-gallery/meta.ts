import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "gyro-gallery",
	title: "Gyro Gallery",
	description: "Gallery tiles riding three concentric, counter-rotating orbits on one tilted plane, like the rings of a gyroscope. The rig turns to face the pointer and calms as it nears; pointing near a piece brings it forward on a lime spoke from the core with its name beside it, and a click opens it. Page scroll winds the rings and swivels the plane.",
	interaction: "Tiles ride three counter-rotating orbits that turn to face the pointer. Pointing near a piece brings it forward. Drag throws the rings and scroll winds them.",
	categories: ["Media Galleries"],
	tags: ["drag", "scroll-driven", "cursor-tracking", "autoplay", "responsive"],
	inspiration: {
		source: "Tween UI",
		url: "https://tween-ui.vercel.app/block/gyro-gallery",
		authorUrl: "https://tween-ui.vercel.app",
		relationship: "port",
	},
	dependencies: ["@gsap/react", "gsap"],
	registryDependencies: [],
	props: [
		{ name: "items", type: "GyroItem[]", default: "DEFAULT_ITEMS" },
		{ name: "title", type: "string", default: "'The archive, in orbit.'" },
		{ name: "description", type: "string", default: "'Point near a piece to bring it forwa…" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: true },
	rating: 5,
	status: "needs-review",
});
