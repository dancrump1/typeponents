import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "letter3d-swap",
	title: "Letter3d Swap",
	description: "",
	interaction: "",
	categories: ["Text Animations"],
	tags: ["spring", "hover"],
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "text", type: "string", description: "Text to display and animate", required: true },
		{ name: "mainClassName", type: "string", description: "Class name for the main container element." },
		{ name: "frontFaceClassName", type: "string", description: "Class name for the front face element." },
		{ name: "secondFaceClassName", type: "string", description: "Class name for the secondary face element." },
		{ name: "paddingX", type: "number", default: "0", description: "X Padding to add around the text content for the box (in pixels)" },
		{ name: "paddingY", type: "number", default: "10", description: "Y Padding to add around the text content for the box (in pixels)" },
		{ name: "staggerDuration", type: "number", default: "0.05", description: "Duration of stagger delay between elements in seconds." },
		{ name: "staggerFrom", type: "number | \"first\" | \"last\" | \"center\" | \"random\"", default: "\"first\"", description: "Direction to stagger animations from." },
		{ name: "transition", type: "Transition", default: "{ type: \"spring\", damping: 30, stiffn…", description: "Animation transition configuration." },
		{ name: "charWidth", type: "number", description: "Fixed width for each character box (optional)" },
		{ name: "charHeight", type: "number", description: "Fixed height for each character box (optional)" },
		{ name: "rotateDirection", type: "\"bottom\" | \"left\" | \"right\" | \"top\"", default: "\"right\"", description: "Direction of rotation" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
