# Infinite Moving Cards

- Categories: Media Galleries
- Tags: hover
- Import: `@/components/ui/infinite-moving-cards`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/infinite-moving-cards

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/infinite-moving-cards.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` *(required)* | `{ quote: string; name: string; title: string; }[]` | — | — |
| `direction` | `"left" | "right"` | `"left"` | — |
| `speed` | `"fast" | "normal" | "slow"` | `"fast"` | — |
| `pauseOnHover` | `boolean` | `true` | — |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { InfiniteMovingCards } from "./component";

export default function InfiniteMovingCardsDemo() {
	return (
		<div className="h-160 rounded-md flex flex-col antialiased bg-background dark:bg-background dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
			<InfiniteMovingCards
				items={testimonialsUsages}
				direction="right"
				speed="slow"
			/>
		</div>
	);
}

export const testimonialsUsages = [
	{
		quote: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
		name: "Charles Dickens",
		title: "A Tale of Two Cities",
	},
	{
		quote: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
		name: "William Shakespeare",
		title: "Hamlet",
	},
	{
		quote: "All that we see or seem is but a dream within a dream.",
		name: "Edgar Allan Poe",
		title: "A Dream Within a Dream",
	},
	{
		quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
		name: "Jane Austen",
		title: "Pride and Prejudice",
	},
	{
		quote: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
		name: "Herman Melville",
		title: "Moby-Dick",
	},
];
```

## Source

### `components/ui/infinite-moving-cards.tsx`

```tsx
"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// https://ui.aceternity.com/components/infinite-moving-cards

export const InfiniteMovingCards = ({
	items,
	direction = "left",
	speed = "fast",
	pauseOnHover = true,
	className,
}: {
	items: {
		quote: string;
		name: string;
		title: string;
	}[];
	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);

	useEffect(() => {
		addAnimation();
	}, []);
	const [start, setStart] = useState(false);
	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}
	const getDirection = () => {
		if (containerRef.current) {
			if (direction === "left") {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"forwards"
				);
			} else {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"reverse"
				);
			}
		}
	};
	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === "fast") {
				containerRef.current.style.setProperty(
					"--animation-duration",
					"20s"
				);
			} else if (speed === "normal") {
				containerRef.current.style.setProperty(
					"--animation-duration",
					"40s"
				);
			} else {
				containerRef.current.style.setProperty(
					"--animation-duration",
					"80s"
				);
			}
		}
	};
	return (
		<div
			ref={containerRef}
			className={cn(
				"scroller relative z-20  max-w-7xl overflow-hidden  mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					" flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
					start && "animate-scroll ",
					pauseOnHover && "hover:paused"
				)}
			>
				{items.map((item, idx) => (
					<li
						className="w-[350px] max-w-full relative rounded-2xl border border-b-0 shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
						style={{
							background:
								"linear-gradient(180deg, var(--slate-800), var(--slate-900)",
						}}
						key={item.name}
					>
						<blockquote>
							<div
								aria-hidden="true"
								className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%+4px)] w-[calc(100%+4px)]"
							></div>
							<span className=" relative z-20 text-sm leading-[1.6] text-foreground font-normal">
								{item.quote}
							</span>
							<div className="relative z-20 mt-6 flex flex-row items-center">
								<span className="flex flex-col gap-1">
									<span className=" text-sm leading-[1.6] text-foreground font-normal">
										{item.name}
									</span>
									<span className=" text-sm leading-[1.6] text-foreground font-normal">
										{item.title}
									</span>
								</span>
							</div>
						</blockquote>
					</li>
				))}
			</ul>
		</div>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/infinite-moving-cards

Adapted from the original. Credit the original author when you ship this.
