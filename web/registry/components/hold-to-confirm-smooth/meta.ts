import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "hold-to-confirm-smooth",
	title: "Hold To Confirm Smooth",
	description: "",
	interaction: "",
	categories: ["Buttons"],
	tags: ["spring", "drag", "hover", "keyboard"],
	inspiration: {
		source: "GitHub",
		url: "https://github.com/arihantcodes/spectrum-ui/blob/main/app/registry/hold-to-confirm/hold-to-confirm.tsx",
		author: "arihantcodes",
		authorUrl: "https://github.com/arihantcodes",
		relationship: "adaptation",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [
		{ name: "onConfirm", type: "() => void", description: "Fires exactly once when the hold reaches completion", required: true },
		{ name: "duration", type: "number", default: "1200", description: "How long the button must be held, in milliseconds. Default 1200" },
		{ name: "label", type: "string", default: "\"Hold to delete\"", description: "Idle label. Default \"Hold to delete\"" },
		{ name: "confirmedLabel", type: "string", default: "\"Deleted\"", description: "Label shown after a completed hold. Default \"Deleted\"" },
		{ name: "icon", type: "React.ReactNode", description: "Replaces the default trash icon" },
		{ name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"", description: "Visual size of the button. Default \"md\"" },
		{ name: "resetDelay", type: "number", default: "1500", description: "Milliseconds before resetting to idle after confirming; 0 stays confirmed. Default 1500" },
		{ name: "disabled", type: "boolean", default: "false", description: "Disables pointer and keyboard interaction" },
		{ name: "className", type: "string" },
	],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
