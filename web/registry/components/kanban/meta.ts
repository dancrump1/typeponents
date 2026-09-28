import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "kanban",
	title: "Kanban",
	description:
		"Kanban board with draggable cards across columns.",
	interaction:
		"Drag cards between columns. Unpublished until missing dependencies are vendored in.",
	categories: ["Data & Tables"],
	tags: ["drag"],
	dependencies: ["autosize", "fast-average-color", "html-react-parser", "lucide-react", "motion", "prop-types", "react-trello", "uuid"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "draft",
	hidden: true,
	notes: "Does not build: Imports modules that were never part of this repo (../GradientHeader, ../library/Magnet, ../atoms/*) and the npm packages react-trello and fast-average-color are not installed. Needs those files vendored in before it can ship. No demo yet.",
});
