import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "browser-window",
	title: "Browser Window",
	description:
		"Browser chrome frame with traffic-light buttons, an optional address bar and sidebar, wrapping any content as a screenshot-style mockup.",
	interaction:
		"Static frame — it renders as-is on load; the only motion is the window buttons and sidebar rows tinting under the pointer.",
	categories: ["Backgrounds"],
	tags: ["hover"],
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "size", type: "\"sm\" | \"md\" | \"lg\" | \"xl\"", default: "\"md\"" },
		{ name: "showSidebar", type: "boolean", default: "false" },
		{ name: "sidebarPosition", type: "\"left\" | \"right\" | \"top\" | \"bottom\"", default: "\"left\"" },
		{ name: "headerStyle", type: "\"minimal\" | \"full\"", default: "\"minimal\"" },
		{ name: "variant", type: "\"chrome\" | \"safari\" | \"generic\"", default: "\"generic\"" },
		{ name: "theme", type: "\"light\" | \"dark\" | \"auto\"", default: "\"auto\"" },
		{ name: "url", type: "string" },
		{ name: "sidebarItems", type: "{ icon?: React.ReactNode; label: string; active?: boolean…" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
