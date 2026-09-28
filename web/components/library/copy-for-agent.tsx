"use client";

import { useState } from "react";
import { Bot, Check, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * The agent-facing counterpart to "copy the code".
 *
 * `doc` is the same markdown served at /docs/<slug>.md: description, install
 * command, dependencies, props table, full source and attribution. Pasting it
 * into an agent gives it everything it needs, and because the install command
 * is the shadcn CLI the agent doesn't have to guess where `cn` lives in the
 * target project.
 */
export function CopyForAgent({
	doc,
	prompt,
}: {
	doc: string;
	prompt: string;
}) {
	const [copied, setCopied] = useState<"doc" | "prompt" | null>(null);

	async function copy(kind: "doc" | "prompt", value: string) {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(kind);
			setTimeout(() => setCopied(null), 2000);
		} catch {
			// Clipboard unavailable; nothing useful to show the user here.
		}
	}

	return (
		<div className="flex flex-wrap items-center gap-2">
			<Button
				type="button"
				size="sm"
				onClick={() => copy("prompt", prompt)}
				className="gap-1.5"
			>
				{copied === "prompt" ? (
					<Check className="size-3.5" aria-hidden />
				) : (
					<Bot className="size-3.5" aria-hidden />
				)}
				{copied === "prompt" ? "Copied prompt" : "Copy for agent"}
			</Button>

			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={() => copy("doc", doc)}
				className="gap-1.5"
			>
				{copied === "doc" ? (
					<Check className="size-3.5" aria-hidden />
				) : (
					<FileText className="size-3.5" aria-hidden />
				)}
				{copied === "doc" ? "Copied page" : "Copy page as markdown"}
			</Button>
		</div>
	);
}
