import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "editor",
	title: "Editor",
	description: "",
	interaction: "",
	categories: ["Utilities"],
	tags: ["hover", "keyboard"],
	dependencies: ["@tiptap/core", "@tiptap/extension-character-count", "@tiptap/extension-code-block-lowlight", "@tiptap/extension-placeholder", "@tiptap/extension-subscript", "@tiptap/extension-superscript", "@tiptap/extension-table", "@tiptap/extension-table-cell", "@tiptap/extension-table-header", "@tiptap/extension-table-row", "@tiptap/extension-task-item", "@tiptap/extension-task-list", "@tiptap/extension-text-style", "@tiptap/extension-typography", "@tiptap/pm", "@tiptap/react", "@tiptap/starter-kit", "@tiptap/suggestion", "fuse.js", "lowlight", "lucide-react", "tippy.js"],
	registryDependencies: ["button", "command", "dropdown-menu", "popover", "tooltip"],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
});
