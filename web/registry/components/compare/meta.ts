import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "compare",
	title: "Compare",
	description:
		"Before and after image comparison split by a glowing vertical divider that throws off sparks.",
	interaction:
		"Moving the pointer across the frame sweeps the divider along with it and wipes between the two images, or in drag mode you grab the handle instead; left alone with autoplay on, the divider slides back and forth by itself.",
	categories: ["Images"],
	tags: ["drag", "hover", "cursor-tracking", "autoplay"],
	dependencies: ["motion"],
	registryDependencies: ["sparkles"],
	props: [
		{ name: "firstImage", type: "string", default: "\"\"" },
		{ name: "secondImage", type: "string", default: "\"\"" },
		{ name: "className", type: "string" },
		{ name: "firstImageClassName", type: "string" },
		{ name: "secondImageClassname", type: "string" },
		{ name: "initialSliderPercentage", type: "number", default: "50" },
		{ name: "slideMode", type: "\"hover\" | \"drag\"", default: "\"hover\"" },
		{ name: "showHandlebar", type: "boolean", default: "true" },
		{ name: "autoplay", type: "boolean", default: "false" },
		{ name: "autoplayDuration", type: "number", default: "5000" },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
