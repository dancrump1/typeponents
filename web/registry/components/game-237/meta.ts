import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "game-237",
	title: "Game 237",
	description:
		"First-person chase game set in a snowy 3D hedge maze, with a 60 second countdown and a red figure hunting you.",
	interaction:
		"Press the spacebar on the title screen to begin, then walk with WASD or the arrow keys and look around by moving the mouse. Escaping past the outer wall before the clock runs out rolls the credits; getting caught fades the screen to black and offers a restart.",
	categories: ["Utilities"],
	tags: ["webgl", "spring", "keyboard", "autoplay"],
	dependencies: ["@react-three/cannon", "@react-three/drei", "@react-three/fiber", "gsap", "three"],
	registryDependencies: [],
	props: [],
	risk: { heavy: true, fullscreen: true, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
