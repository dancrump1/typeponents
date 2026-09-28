"use client";

import { useState } from "react";

import type { SourceFile } from "@/lib/registry";
import { cn } from "@/lib/utils";

import { CopyButton } from "./copy-button";

/**
 * Multi-file source viewer. Files are shown at the path they'll occupy in the
 * consumer's project, so the tab labels double as install documentation.
 */
export function CodeViewer({
	files,
	className,
}: {
	files: SourceFile[];
	className?: string;
}) {
	const [activeIndex, setActiveIndex] = useState(0);

	if (!files.length) return null;

	const active = files[Math.min(activeIndex, files.length - 1)];

	return (
		<div className={cn("overflow-hidden rounded-lg border", className)}>
			<div className="flex items-center justify-between gap-2 border-b bg-muted/40 pl-1 pr-2">
				<div className="flex min-w-0 items-center gap-0.5 overflow-x-auto py-1">
					{files.map((file, index) => (
						<button
							key={file.path}
							type="button"
							onClick={() => setActiveIndex(index)}
							className={cn(
								"whitespace-nowrap rounded px-2 py-1 font-mono text-[11px] transition-colors",
								index === activeIndex
									? "bg-background font-medium text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							)}
						>
							{file.path}
						</button>
					))}
				</div>
				<CopyButton value={active.content} variant="ghost" size="icon" />
			</div>
			<pre className="max-h-[32rem] overflow-auto bg-background px-4 py-3 text-xs leading-relaxed">
				<code>{active.content}</code>
			</pre>
		</div>
	);
}
