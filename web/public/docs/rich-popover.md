# Rich Popover

- Categories: Navigation
- Tags: spring, hover
- Import: `@/components/ui/rich-popover`
- Inspiration: SmoothUI (adaptation) — https://smoothui.dev/doc/components/rich-popover

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/rich-popover.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `@radix-ui/react-popover`
- `lucide-react`
- `motion`

## Registry dependencies

- `icons`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` *(required)* | `React.ReactNode` | — | — |
| `title` *(required)* | `string` | — | — |
| `description` | `string` | — | — |
| `icon` | `React.ReactNode` | — | — |
| `href` | `string` | — | — |
| `actionLabel` | `string` | — | — |
| `actionHref` | `string` | — | — |
| `onActionClick` | `(() => void)` | — | — |
| `meta` | `string` | — | — |
| `className` | `string` | `""` | — |
| `side` | `"top" | "bottom" | "left" | "right"` | `"top"` | — |
| `align` | `"start" | "center" | "end"` | `"center"` | — |

## Usage

```tsx
"use client";

import { YoutubeIcon } from "@/registry/components/icons/youtube";
import RichPopover from "./component";

export default function RichPopoverDemo() {
	return (
		<div className="flex items-center justify-center p-6">
			<div className="max-w-2xl space-y-4 text-base leading-relaxed">
				<p className="text-muted-foreground">
					OpenAI has just announced their latest breakthrough in artificial
					intelligence
					<RichPopover
						trigger={
							<span className="bg-background mx-2 inline-flex size-8 cursor-pointer items-center justify-center rounded-md border align-middle">
								<YoutubeIcon className="h-4 w-4 fill-red-600" />
							</span>
						}
						title="Introducing GPT-5"
						description={
							'"GPT-5 features state-of-the-art performance across coding, math, writing assistance, health, visual perception, and more. Use GPT-5 to build websites, create apps, and tap into its improved writing capabilities to help with everyday tasks like reports, emails, and editing."'
						}
						href="https://www.youtube.com/watch?v=boJG84Jcf-4"
						actionLabel="Watch announcement"
						actionHref="https://www.youtube.com/watch?v=boJG84Jcf-4"
						meta="0:00–2:15"
					/>
					marking a significant leap forward in AI capabilities. This new
					model represents the most advanced language model ever created,
					with unprecedented performance across multiple domains including
					coding, mathematics, and creative writing.
				</p>
				<p className="text-muted-foreground">
					GPT-5&apos;s enhanced capabilities extend beyond traditional text
					processing to include improved visual perception and
					health-related assistance, making it a versatile tool for both
					professional and personal use. The model is now rolling out to
					all users, democratizing access to cutting-edge AI technology.
				</p>
			</div>
		</div>
	);
}
```

## Source

### `components/ui/rich-popover.tsx`

```tsx
"use client";

import type * as React from "react";

import Link from "next/link";

import * as Popover from "@radix-ui/react-popover";
import { Clock, ExternalLink, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Credit:
// https://smoothui.dev/doc/components/rich-popover
export interface RichTooltipProps {
	trigger: React.ReactNode;
	title: string;
	description?: string;
	icon?: React.ReactNode;
	href?: string;
	actionLabel?: string;
	actionHref?: string;
	onActionClick?: () => void;
	meta?: string;
	className?: string;
	side?: "top" | "bottom" | "left" | "right";
	align?: "start" | "center" | "end";
}

export function YouTubeIcon({
	className = "h-4 w-4 fill-red-600",
}: {
	className?: string;
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			width="16"
			height="16"
			className={className}
			role="img"
			aria-label="YouTube"
			focusable="false"
		>
			<path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
		</svg>
	);
}

export default function RichPopover({
	trigger,
	title,
	description,
	icon,
	href,
	actionLabel,
	actionHref,
	onActionClick,
	meta,
	className = "",
	side = "top",
	align = "center",
}: RichTooltipProps) {
	const Title = (
		<div className="flex items-center gap-2 text-sm font-medium">
			{icon ?? <YouTubeIcon />}
			{href ? (
				<Link
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1 hover:underline"
				>
					<span>{title}</span>
					<ExternalLink className="h-3.5 w-3.5 opacity-70" />
				</Link>
			) : (
				<span>{title}</span>
			)}
		</div>
	);

	const Action = actionLabel ? (
		actionHref ? (
			<Link
				href={actionHref}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-background/90"
			>
				<Play className="h-3.5 w-3.5" /> {actionLabel}
			</Link>
		) : (
			<button
				onClick={onActionClick}
				className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-background/90"
				type="button"
			>
				<Play className="h-3.5 w-3.5" /> {actionLabel}
			</button>
		)
	) : null;

	return (
		<Popover.Root>
			<Popover.Trigger asChild>{trigger}</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					side={side}
					align={align}
					sideOffset={8}
					className={`z-50 ${className}`}
					asChild
				>
					<motion.div
						initial={{
							opacity: 0,
							scale: 0.95,
							y: 5,
							filter: "blur(8px)",
						}}
						animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, scale: 0.95, y: 5, filter: "blur(8px)" }}
						transition={{
							type: "spring",
							stiffness: 500,
							damping: 30,
							duration: 0.2,
						}}
						className="relative rounded-2xl border border-white/10 bg-background px-4 py-3 text-foreground shadow-xl"
					>
						{Title}
						{description && (
							<p className="mt-3 max-w-xs text-base leading-relaxed text-balance text-foreground/90">
								{description}
							</p>
						)}
						{(meta || Action) && (
							<div className="mt-4 flex items-center justify-between gap-3">
								{meta ? (
									<span className="inline-flex items-center gap-1 rounded-full bg-background/10 px-3 py-1 text-xs text-foreground">
										<Clock className="h-3.5 w-3.5" /> {meta}
									</span>
								) : (
									<span />
								)}
								{Action}
							</div>
						)}

						{/* Tail */}
						<Popover.Arrow className="fill-black" />
					</motion.div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
```

## Attribution

Source: SmoothUI · Original: https://smoothui.dev/doc/components/rich-popover

Adapted from the original. Credit the original author when you ship this.
