import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "image-pixel-trail",
	title: "Image Pixel Trail",
	description:
		"Pointer trail made of pixelated image fragments.",
	interaction:
		"Moving the cursor leaves a trail of image tiles that fade out behind it.",
	categories: ["Cursor & Pointer Effects", "Images"],
	tags: ["canvas", "drag", "cursor-tracking", "autoplay", "responsive"],
	inspiration: {
		source: "Componentry",
		url: "https://componentry.dev/docs/components/pixel-image-trail",
		authorUrl: "https://componentry.dev",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "src", type: "string", description: "Image revealed by the pixel trail.", required: true },
		{ name: "alt", type: "string", description: "Accessible description for the image.", required: true },
		{ name: "pixelSize", type: "number", default: "36", description: "Width and height of each square in pixels." },
		{ name: "radius", type: "number", default: "58", description: "Maximum distance for an occasional satellite pixel." },
		{ name: "fadeDuration", type: "number", default: "900", description: "Time in milliseconds before a square completely fades." },
		{ name: "maxPixels", type: "number", default: "84", description: "Maximum number of squares kept in the trail." },
		{ name: "initialPixels", type: "number", default: "24", description: "Number of image fragments visible before the first interaction." },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
