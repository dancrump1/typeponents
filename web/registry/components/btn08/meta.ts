import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "btn08",
	title: "Btn08",
	description:
		"Share button that trades itself for a row of social icons in the same footprint.",
	interaction:
		"Hovering the button fades it out while Twitter, Facebook, LinkedIn and copy-link icons slide in from the left one after another; moving the pointer away reverses it.",
	categories: ["Buttons"],
	tags: ["hover"],
	inspiration: {
		source: "Kokonut UI",
		url: "https://kokonutui.com/docs/components/button#button---share",
		authorUrl: "https://kokonutui.com",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react"],
	registryDependencies: ["button"],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
