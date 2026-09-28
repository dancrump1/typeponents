# Hero Highlight

- Categories: Text
- Tags: hover, cursor-tracking
- Import: `@/components/ui/hero-highlight`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/hero-highlight

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/hero-highlight.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |
| `containerClassName` | `string` | — | — |

## Usage

```tsx
"use client";

import {
	HeroHighlight,
	Highlight,
} from "./component";
import { motion } from "motion/react";

export default function HeroHighlightDemo() {
	return (
		<HeroHighlight>
			<motion.h1
				initial={{
					opacity: 0,
					y: 20,
				}}
				animate={{
					opacity: 1,
					y: [20, -5, 0],
				}}
				transition={{
					duration: 0.5,
					ease: [0.4, 0.0, 0.2, 1],
				}}
				className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-secondary dark:text-secondary max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
			>
				With insomnia, nothing&apos;s real. Everything is far away.
				Everything is a{" "}
				<Highlight className="text-secondary dark:text-secondary">
					copy, of a copy, of a copy.
				</Highlight>
			</motion.h1>
		</HeroHighlight>
	);
}
```

## Source

### `components/ui/hero-highlight.tsx`

```tsx
"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

// https://ui.aceternity.com/components/hero-highlight

export const HeroHighlight = ({
	children,
	className,
	containerClassName,
}: {
	children: React.ReactNode;
	className?: string;
	containerClassName?: string;
}) => {
	let mouseX = useMotionValue(0);
	let mouseY = useMotionValue(0);

	function handleMouseMove({
		currentTarget,
		clientX,
		clientY,
	}: React.MouseEvent<HTMLDivElement>) {
		if (!currentTarget) return;
		let { left, top } = currentTarget.getBoundingClientRect();

		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	return (
		<div
			className={cn(
				"relative h-160 flex items-center bg-background dark:bg-background justify-center w-full group",
				containerClassName
			)}
			onMouseMove={handleMouseMove}
		>
			<div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800  pointer-events-none" />
			<motion.div
				className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500   absolute inset-0 opacity-0 transition delay-1500 duration-300 group-hover:opacity-100"
				style={{
					WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
					maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
				}}
			/>

			<div className={cn("relative z-1", className)}>{children}</div>
		</div>
	);
};

export const Highlight = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<motion.span
			initial={{
				backgroundSize: "0% 100%",
			}}
			animate={{
				backgroundSize: "100% 100%",
			}}
			transition={{
				duration: 2,
				ease: "linear",
				delay: 2.5,
			}}
			style={{
				backgroundRepeat: "no-repeat",
				backgroundPosition: "left center",
				display: "inline",
			}}
			className={cn(
				`relative inline-block pb-1   px-1 rounded-lg bg-linear-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
				className
			)}
		>
			{children}
		</motion.span>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/hero-highlight

Adapted from the original. Credit the original author when you ship this.
