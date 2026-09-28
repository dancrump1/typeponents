# Glowing Background

Dark card topped with a grid of tiny dots that light up like stars, above a title and description.

**Interaction.** Left alone, a handful of dots flare white with a blue halo every few seconds and fade back. Hovering the card lights the whole grid, the glow rippling across the dots in sequence.

- Categories: Backgrounds
- Tags: hover, autoplay
- Import: `@/components/ui/glowing-background`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/glowing-stars-effect

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/glowing-background.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import {
	GlowingStarsBackgroundCard,
	GlowingStarsDescription,
	GlowingStarsTitle,
} from "./component";

export default function GlowingStarsBackgroundCardPreview() {
	return (
		<div className="flex py-20 items-center justify-center antialiased">
			<GlowingStarsBackgroundCard>
				<GlowingStarsTitle>Next.js 14</GlowingStarsTitle>
				<div className="flex justify-between items-end">
					<GlowingStarsDescription>
						The power of full-stack to the frontend. Read the release
						notes.
					</GlowingStarsDescription>
					<div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
						<Icon />
					</div>
				</div>
			</GlowingStarsBackgroundCard>
		</div>
	);
}

const Icon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			className="h-4 w-4 text-secondary stroke-2"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
			/>
		</svg>
	);
};
```

## Source

### `components/ui/glowing-background.tsx`

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

// https://ui.aceternity.com/components/glowing-stars-effect

export const GlowingStarsBackgroundCard = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	const [mouseEnter, setMouseEnter] = useState(false);

	return (
		<div
			onMouseEnter={() => {
				setMouseEnter(true);
			}}
			onMouseLeave={() => {
				setMouseEnter(false);
			}}
			className={cn(
				"bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 max-w-md max-h-80 h-full w-full rounded-xl border border-[#eaeaea] dark:border-neutral-600",
				className
			)}
		>
			<div className="flex justify-center items-center">
				<Illustration mouseEnter={mouseEnter} />
			</div>
			<div className="px-2 pb-6">{children}</div>
		</div>
	);
};

export const GlowingStarsDescription = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<p className={cn("text-base text-foreground max-w-[16rem]", className)}>
			{children}
		</p>
	);
};

export const GlowingStarsTitle = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<h2 className={cn("font-bold text-2xl text-foreground", className)}>
			{children}
		</h2>
	);
};

export const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
	const stars = 108;
	const columns = 18;

	const [glowingStars, setGlowingStars] = useState<number[]>([]);

	const highlightedStars = useRef<number[]>([]);

	useEffect(() => {
		const interval = setInterval(() => {
			highlightedStars.current = Array.from({ length: 5 }, () =>
				Math.floor(Math.random() * stars)
			);
			setGlowingStars([...highlightedStars.current]);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className="h-48 p-1 w-full"
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				gap: `1px`,
			}}
		>
			{[...Array(stars)].map((_, starIdx) => {
				const isGlowing = glowingStars.includes(starIdx);
				const delay = (starIdx % 10) * 0.1;
				const staticDelay = starIdx * 0.01;
				return (
					<div
						key={`matrix-col-${starIdx}}`}
						className="relative flex items-center justify-center"
					>
						<Star
							isGlowing={mouseEnter ? true : isGlowing}
							delay={mouseEnter ? staticDelay : delay}
						/>
						{mouseEnter && <Glow delay={staticDelay} />}
						<AnimatePresence mode="wait">
							{isGlowing && <Glow delay={delay} />}
						</AnimatePresence>
					</div>
				);
			})}
		</div>
	);
};

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
	return (
		<motion.div
			key={delay}
			initial={{
				scale: 1,
			}}
			animate={{
				scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
				background: isGlowing ? "#fff" : "#666",
			}}
			transition={{
				duration: 2,
				ease: "easeInOut",
				delay: delay,
			}}
			className={cn("bg-background h-px w-px rounded-full relative z-20")}
		></motion.div>
	);
};

const Glow = ({ delay }: { delay: number }) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			transition={{
				duration: 2,
				ease: "easeInOut",
				delay: delay,
			}}
			exit={{
				opacity: 0,
			}}
			className="absolute  left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
		/>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/glowing-stars-effect

Adapted from the original. Credit the original author when you ship this.
