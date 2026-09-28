import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "avatar-stack",
	title: "Avatar Stack",
	description: "A dynamic stack of overlapping user avatars featuring custom tooltip display variants that track hover directions or coordinates with spring dynamics.",
	interaction: "Hover animations: spring-tilt (follows coordinate movements), spring-box (tilts the box container), and slide-blur (directional blur reveal).",
	categories: ["Cards"],
	tags: ["spring", "hover", "cursor-tracking"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/avatar-stack",
		author: "Saurabh Sharma",
		authorUrl: "https://github.com/Saurabh-2607",
		license: "Great UI Custom License",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [
		{ name: "users", type: "User[]", default: "DEFAULT_USERS" },
		{ name: "variant", type: "\"spring-tilt\" | \"spring-box\" | \"slide-blur\"", default: "\"spring-tilt\"" },
		{ name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
		{ name: "className", type: "string", default: "\"\"" },
		{ name: "avatarClassName", type: "string", default: "\"\"" },
		{ name: "tooltipClassName", type: "string", default: "\"\"" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
