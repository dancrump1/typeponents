import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "image-ripple",
	title: "Image Ripple",
	description: "",
	interaction: "",
	categories: ["Images"],
	tags: ["webgl", "cursor-tracking"],
	dependencies: ["@react-three/drei", "@react-three/fiber", "three"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
