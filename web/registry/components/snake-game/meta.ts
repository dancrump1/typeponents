import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "snake-game",
	title: "Snake Game",
	description: "",
	interaction: "",
	categories: ["Games"],
	tags: [],
	dependencies: ["lucide-react"],
	registryDependencies: ["button"],
	props: [
		{ name: "snakeDots", type: "{ x: number; y: number; }[]", required: true },
		{ name: "apple", type: "{ x: number; y: number; }", required: true },
		{ name: "isRainbowMode", type: "boolean", required: true },
		{ name: "rainbowColors", type: "string[]", required: true },
	],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
