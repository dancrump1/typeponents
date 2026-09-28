import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "sticky-countdown",
	title: "Sticky Countdown",
	description:
		"A slim announcement bar that sticks to the top of the page counting down the days, hours, minutes and seconds to a date.",
	interaction:
		"Runs on its own — each number slides up and fades out as it expires, and the new one rises into its place from below, so only the units that actually changed move.",
	categories: ["Special Effects & FX", "Utilities"],
	tags: ["autoplay"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "unit", type: "Units", required: true },
		{ name: "text", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
