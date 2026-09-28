"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CopyButtonProps = {
	value: string;
	label?: string;
	copiedLabel?: string;
	variant?: "default" | "outline" | "ghost" | "secondary";
	size?: "sm" | "default" | "icon";
	className?: string;
};

export function CopyButton({
	value,
	label,
	copiedLabel = "Copied",
	variant = "outline",
	size = "sm",
	className,
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard is unavailable over plain http on some hosts; fail quietly.
		}
	}

	const Icon = copied ? Check : Copy;

	return (
		<Button
			type="button"
			variant={variant}
			size={size}
			onClick={copy}
			className={cn("gap-1.5", className)}
			aria-label={label ? undefined : "Copy to clipboard"}
		>
			<Icon className="size-3.5" aria-hidden />
			{label ? <span>{copied ? copiedLabel : label}</span> : null}
		</Button>
	);
}
