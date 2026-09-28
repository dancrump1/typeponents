import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "otp-input",
	title: "OTP Input",
	description: "A six-digit OTP input component with smooth animations, auto-focus navigation, and visual feedback for verification success or errors.",
	interaction: "Type six digits with auto-advance; the row animates success or error.",
	categories: ["Forms & Inputs"],
	tags: ["spring", "hover", "keyboard"],
	inspiration: {
		source: "StackBits",
		url: "https://stackbits.dev/docs/otpinput",
		author: "Samit Kapoor",
		authorUrl: "https://github.com/samitkapoor",
		license: "MIT",
		relationship: "port",
	},
	dependencies: ["framer-motion", "lucide-react"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
