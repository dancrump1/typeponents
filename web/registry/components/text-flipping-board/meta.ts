import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "text-flipping-board",
	title: "Text Flipping Board",
	description:
		"Airport split-flap departure board that spells out a message across a grid of hinged character tiles.",
	interaction:
		"Whenever the message changes the tiles clatter through random letters before landing on the right one, starting at the top left and rippling across the board, with the odd tile flashing a colour mid-shuffle.",
	categories: ["Text", "Text Animations", "Grids & Layouts"],
	tags: [],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "rows", type: "string[]" },
		{ name: "text", type: "string" },
		{ name: "className", type: "string" },
		{ name: "duration", type: "number", default: "BASE_TOTAL_S", description: "Total animation duration in seconds. Defaults to ~1.2s." },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
