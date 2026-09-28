import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "staggered-dropdown",
	title: "Staggered Dropdown",
	description:
		"An actions menu that unrolls below a button, with an icon and label on every row.",
	interaction:
		"Clicking the button flips its chevron and unrolls the panel downward from its top edge; the rows then fade up one after another, each icon popping to full size a beat after its label. Picking a row closes the menu in reverse.",
	categories: ["Buttons"],
	tags: ["hover"],
	dependencies: ["motion", "react-icons"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", required: true },
		{ name: "Icon", type: "IconType", required: true },
		{ name: "setOpen", type: "Dispatch<SetStateAction<boolean>>", required: true },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
