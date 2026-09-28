import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "fab",
	title: "Fab",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["spring", "hover"],
	inspiration: {
		source: "ui.chetanverma.com",
		url: "https://ui.chetanverma.com/components/floating-action-menu",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react", "motion"],
	registryDependencies: ["button"],
	props: [
		{ name: "options", type: "{ label: string; onClick: () => void; Icon?: React.ReactN…", required: true },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
