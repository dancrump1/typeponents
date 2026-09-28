import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "action-search-bar",
	title: "Action Search Bar",
	description:
		"Command-palette search field that lists matching actions with icons, shortcuts and type labels.",
	interaction:
		"Focusing the field drops the action list open and the rows stagger in one after another; typing filters the list as you go, and the magnifier at the end of the field flips up to a send arrow once there is text.",
	categories: ["Forms & Inputs"],
	tags: ["hover"],
	inspiration: {
		source: "Kokonut UI",
		url: "https://kokonutui.com/docs/components/action-search-bar",
		authorUrl: "https://kokonutui.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: ["input"],
	props: [
		{ name: "actions", type: "Action[]", default: "allActionsSample" },
		{ name: "defaultOpen", type: "boolean", default: "false" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
