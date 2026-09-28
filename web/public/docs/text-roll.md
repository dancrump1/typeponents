# Text Roll

- Categories: Text, Text Animations
- Import: `@/components/ui/text-roll`
- Inspiration: Motion Primitives (adaptation) — https://motion-primitives.com/docs/text-roll

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-roll.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | `number` | `0.5` | — |
| `getEnterDelay` | `((index: number) => number)` | `(i) => i * 0.1` | — |
| `getExitDelay` | `((index: number) => number)` | `(i) => i * 0.1 + 0.2` | — |
| `className` | `string` | — | — |
| `transition` | `Transition` | `{ ease: "easeIn" }` | — |
| `variants` | `{ enter: { initial: Target | VariantLabels | boolean; ani…` | — | — |
| `onAnimationComplete` | `(() => void)` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { TextRoll } from "./component";

export default function TextRollUsage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<TextRoll className="text-4xl text-secondary dark:text-secondary">
				Components
			</TextRoll>{" "}
		</div>
	);
}
```

## Source

### `components/ui/text-roll.tsx`

```tsx
"use client";

import {
	motion,
	Target,
	TargetAndTransition,
	Transition,
	VariantLabels,
} from "motion/react";

// Credit:
// https://motion-primitives.com/docs/text-roll

export type TextRollProps = {
	children: string;
	duration?: number;
	getEnterDelay?: (index: number) => number;
	getExitDelay?: (index: number) => number;
	className?: string;
	transition?: Transition;
	variants?: {
		enter: {
			initial: Target | VariantLabels | boolean;
			animate: TargetAndTransition | VariantLabels;
		};
		exit: {
			initial: Target | VariantLabels | boolean;
			animate: TargetAndTransition | VariantLabels;
		};
	};
	onAnimationComplete?: () => void;
};

export function TextRoll({
	children,
	duration = 0.5,
	getEnterDelay = (i) => i * 0.1,
	getExitDelay = (i) => i * 0.1 + 0.2,
	className,
	transition = { ease: "easeIn" },
	variants,
	onAnimationComplete,
}: TextRollProps) {
	const defaultVariants = {
		enter: {
			initial: { rotateX: 0 },
			animate: { rotateX: 90 },
		},
		exit: {
			initial: { rotateX: 90 },
			animate: { rotateX: 0 },
		},
	} as const;

	const letters = children.split("");

	return (
		<span className={className}>
			{letters.map((letter, i) => {
				return (
					<span
						key={i + "text-roll"}
						className="relative inline-block perspective-[10000px] transform-3d w-auto"
						aria-hidden="true"
					>
						<motion.span
							className="absolute inline-block backface-hidden origin-[50%_25%]"
							initial={
								variants?.enter?.initial ??
								defaultVariants.enter.initial
							}
							animate={
								variants?.enter?.animate ??
								defaultVariants.enter.animate
							}
							transition={{
								...transition,
								duration,
								delay: getEnterDelay(i),
							}}
						>
							{letter === " " ? "\u00A0" : letter}
						</motion.span>
						<motion.span
							className="absolute inline-block backface-hidden origin-[50%_100%]"
							initial={
								variants?.exit?.initial ?? defaultVariants.exit.initial
							}
							animate={
								variants?.exit?.animate ?? defaultVariants.exit.animate
							}
							transition={{
								...transition,
								duration,
								delay: getExitDelay(i),
							}}
							onAnimationComplete={
								letters.length === i + 1
									? onAnimationComplete
									: undefined
							}
						>
							{letter === " " ? "\u00A0" : letter}
						</motion.span>
						<span className="invisible">
							{letter === " " ? "\u00A0" : letter}
						</span>
					</span>
				);
			})}
			<span className="sr-only">{children}</span>
		</span>
	);
}
```

## Attribution

Source: Motion Primitives · Original: https://motion-primitives.com/docs/text-roll

Adapted from the original. Credit the original author when you ship this.
