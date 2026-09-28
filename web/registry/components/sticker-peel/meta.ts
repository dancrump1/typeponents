import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "sticker-peel",
	title: "Sticker Peel",
	description:
		"A round sticker with a message hidden underneath, drawn with a mirrored curl so the peeled part looks like it is folding over.",
	interaction:
		"Hovering rotates the sticker upright and peels the lower half back over itself, uncovering the message underneath; moving away rolls the sticker back down flat.",
	categories: ["Images", "Cursor & Pointer Effects", "Special Effects & FX"],
	tags: ["hover"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "stickerImage", type: "string", required: true },
		{ name: "message", type: "string", required: true },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
