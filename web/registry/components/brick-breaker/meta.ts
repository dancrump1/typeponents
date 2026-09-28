import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "brick-breaker",
	title: "Brick Breaker",
	description:
		"Canvas brick breaker game with a paddle, a bouncing ball, lives, combo scoring and multiple levels.",
	interaction:
		"Steer the paddle with the mouse, a finger or the arrow keys and press space to launch the ball; it ricochets off the walls and knocks out bricks one hit at a time while the score and combo climb, and the board refills when a level is cleared.",
	categories: ["3D & Canvas"],
	tags: [],
	inspiration: {
		source: "hub.joyco.studio",
		url: "https://hub.joyco.studio/components/brick-breaker",
		relationship: "adaptation",
	},
	dependencies: [],
	registryDependencies: [],
	props: [
		{ name: "config", type: "DeepPartial<BrickBreakerConfig>", description: "Partial config overrides" },
		{ name: "levels", type: "Level[]", description: "Custom levels (overrides built-in levels)" },
		{ name: "startLevel", type: "number", default: "1", description: "Starting level (1-indexed)" },
		{ name: "onGameEnd", type: "((result: GameEndResult) => void)", description: "Called when game ends" },
		{ name: "onScoreChange", type: "((score: number, combo: number) => void)", description: "Called when score updates" },
		{ name: "onStateChange", type: "((state: GameState) => void)", description: "Called when game state changes" },
		{ name: "onLevelChange", type: "((level: number) => void)", description: "Called when level changes" },
		{ name: "className", type: "string", description: "Additional container className" },
		{ name: "autoFocus", type: "boolean", default: "true", description: "Auto-focus canvas on mount" },
		{ name: "showFocusRing", type: "boolean", default: "true", description: "Show focus ring when canvas is focused (default: true)" },
	],
	risk: { heavy: true, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
