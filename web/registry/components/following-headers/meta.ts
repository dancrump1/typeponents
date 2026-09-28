import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "following-headers",
	title: "Following Headers",
	description: "",
	interaction: "",
	categories: ["Navigation"],
	tags: ["scroll-driven", "hover"],
	inspiration: {
		source: "cuicui.day",
		url: "https://cuicui.day/application-ui/table-of-contents",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: [],
	props: [
		{ name: "idOfParentContainer", type: "string", required: true },
		{ name: "props", type: "HTMLProps<HTMLDivElement>" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
