"use client";

import type { ReactNode } from "react";

import { CopyButton } from "@/components/library/copy-button";

/**
 * Preview shell for the v0 chat's component picker.
 *
 * Replaces the previous browse-page card, which carried resizable viewports,
 * source tabs and risk handling that the chat never used. The full-featured
 * version of all that now lives on /library/[slug].
 */

export function ComponentLoading() {
	return (
		<div className="flex h-full min-h-24 w-full items-center justify-center text-xs text-muted-foreground">
			Loading preview…
		</div>
	);
}

export function ChatComponentPreview({
	title,
	registryUrl,
	onClose,
	children,
}: {
	title: string;
	registryUrl?: string;
	onClose?: () => void;
	children: ReactNode;
}) {
	return (
		<div className="flex h-full flex-col border-l bg-background">
			<div className="flex items-center justify-between gap-2 border-b px-3 py-2">
				<p className="truncate text-sm font-medium">{title}</p>
				<div className="flex items-center gap-1">
					{registryUrl ? (
						<CopyButton
							value={`npx shadcn@latest add ${registryUrl}`}
							variant="ghost"
							size="icon"
						/>
					) : null}
					{onClose ? (
						<button
							type="button"
							onClick={onClose}
							aria-label="Close preview"
							className="rounded px-1.5 text-sm text-muted-foreground hover:text-foreground"
						>
							×
						</button>
					) : null}
				</div>
			</div>
			<div className="relative flex-1 overflow-hidden isolate [transform:translateZ(0)]">
				{children}
			</div>
		</div>
	);
}
