import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "action-hint",
	title: "Action Hint",
	description: "Wrapper that floats a small label above a button to confirm what the click did.",
	interaction:
		"Clicking the button pops a short message such as Copied above it, which drifts upward and fades out after a moment; only the newest message is ever on screen.",
	categories: ["Buttons"],
	tags: [],
	inspiration: {
		source: "hub.joyco.studio",
		url: "https://hub.joyco.studio/components/action-hint",
		relationship: "adaptation",
	},
	dependencies: ["lucide-react"],
	registryDependencies: ["button"],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
