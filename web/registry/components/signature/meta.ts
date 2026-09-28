import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "signature",
	title: "Signature",
	description: "",
	interaction: "",
	categories: ["Forms & Inputs"],
	tags: [],
	inspiration: {
		source: "Componentry",
		url: "https://www.componentry.fun/docs/components/signature",
		authorUrl: "https://www.componentry.fun",
		relationship: "adaptation",
	},
	dependencies: ["motion", "opentype.js"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", default: "\"Signature\"", description: "Text to generate signature for" },
		{ name: "color", type: "string", default: "\"currentColor\"", description: "Color of the signature path" },
		{ name: "fontSize", type: "number", default: "32", description: "Font size of the signature" },
		{ name: "duration", type: "number", default: "1.5", description: "Animation duration in seconds" },
		{ name: "delay", type: "number", default: "0", description: "Delay before animation starts in seconds" },
		{ name: "className", type: "string", description: "Additional CSS classes" },
		{ name: "inView", type: "boolean", default: "false", description: "Only animate when in view" },
		{ name: "once", type: "boolean", default: "true", description: "Only animate once" },
		{ name: "fontUrl", type: "string", description: "Custom font URL to load" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
