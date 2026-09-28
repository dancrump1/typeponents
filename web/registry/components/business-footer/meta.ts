import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "business-footer",
	title: "Business Footer",
	description:
		"Five-column site footer with a brand block, postal address, social icons and grouped product, company, resource and legal links.",
	interaction:
		"Static layout — it renders in place on load; links and social icons only shift colour as the pointer passes over them.",
	categories: ["Grids & Layouts"],
	tags: ["hover"],
	dependencies: ["react-icons"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
