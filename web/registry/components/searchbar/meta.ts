import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "searchbar",
	title: "Searchbar",
	description: "",
	interaction: "",
	categories: ["Forms & Inputs"],
	tags: ["canvas", "keyboard", "autoplay"],
	inspiration: {
		source: "Aceternity UI",
		url: "https://ui.aceternity.com/components/placeholders-and-vanish-input",
		authorUrl: "https://ui.aceternity.com",
		relationship: "adaptation",
	},
	dependencies: ["motion"],
	registryDependencies: ["three-dot-loader"],
	props: [
		{ name: "onSubmit", type: "(e: React.FormEvent<HTMLFormElement>, value: any) => void", required: true },
		{ name: "placeholders", type: "string[]", default: "placeholdersDefault" },
		{ name: "onChange", type: "((e: React.ChangeEvent<HTMLInputElement>) => void)" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
