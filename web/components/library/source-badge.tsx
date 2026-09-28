import { ExternalLink } from "lucide-react";

import type { Inspiration } from "@/registry/types";
import { cn } from "@/lib/utils";

/**
 * Compact attribution chip. Designers scan for these to judge provenance, so
 * an unknown source is rendered explicitly rather than omitted.
 */
export function SourceBadge({
	inspiration,
	className,
}: {
	inspiration: Inspiration | null;
	className?: string;
}) {
	if (!inspiration?.source && !inspiration?.url) {
		return (
			<span
				className={cn(
					"inline-flex items-center rounded-full border border-dashed px-2 py-0.5 text-[11px] text-muted-foreground",
					className
				)}
			>
				Source unknown
			</span>
		);
	}

	const label = inspiration.source ?? inspiration.url;
	const body = (
		<>
			{label}
			{inspiration.url ? <ExternalLink className="size-2.5" aria-hidden /> : null}
		</>
	);

	const classes = cn(
		"inline-flex items-center gap-1 rounded-full border bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground",
		inspiration.url && "hover:bg-muted hover:text-foreground",
		className
	);

	if (!inspiration.url) return <span className={classes}>{body}</span>;

	return (
		<a
			href={inspiration.url}
			target="_blank"
			rel="noreferrer noopener"
			className={classes}
			onClick={(event) => event.stopPropagation()}
		>
			{body}
		</a>
	);
}
