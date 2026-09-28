# Random Letter Swap Hover

Text label whose characters flip over to an identical copy in a shuffled order, so the swap scatters across the word.

**Interaction.** Hovering the label slides letters out one at a time in random order while matching letters drop in behind them. One variant plays the swap through once; the other holds it and runs it back in reverse when the pointer leaves.

- Categories: Text Animations
- Tags: spring, hover
- Import: `@/components/ui/random-letter-swap-hover`
- Inspiration: Fancy Components (adaptation) — https://www.fancycomponents.dev/docs/components/text/random-letter-swap

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/random-letter-swap-hover.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lodash`
- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `label` *(required)* | `string` | — | — |
| `reverse` | `boolean` | `true` | — |
| `transition` | `any` | `{ type: "spring", duration: 0.8, }` | — |
| `staggerDuration` | `number` | `0.02` | — |
| `className` | `string` | — | — |
| `onClick` | `(() => void)` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import {
	RandomLetterSwapForward,
	RandomLetterSwapPingPong,
} from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-dvw h-dvh rounded-lg bg-background text-3xl md:text-5xl flex flex-col items-center justify-center font-overused-grotesk">
				<div className="h-full text-red-500 rounded-xl py-12  align-text-center gap-y-1 md:gap-y-2 flex flex-col justify-center items-center">
					<RandomLetterSwapForward
						label="Right here!"
						reverse={true}
						className=""
					/>
					<RandomLetterSwapForward
						label="Right now!"
						reverse={false}
						className="font-bold italic px-4"
					/>
					<RandomLetterSwapPingPong label="Right here!" className="" />
					<RandomLetterSwapPingPong
						label="Right now!"
						reverse={false}
						className=" font-bold"
					/>
				</div>
			</div>
		</div>
	);
}
```

## Source

### `components/ui/random-letter-swap-hover.tsx`

```tsx
"use client";

import { useState } from "react";

import { debounce } from "lodash";
import { DynamicAnimationOptions, motion, useAnimate } from "motion/react";

// Credit:
// https://www.fancycomponents.dev/docs/components/text/random-letter-swap

interface TextProps {
	label: string;
	reverse?: boolean;
	transition?: DynamicAnimationOptions;
	staggerDuration?: number;
	className?: string;
	onClick?: () => void;
}

const RandomLetterSwapForward = ({
	label,
	reverse = true,
	transition = {
		type: "spring",
		duration: 0.8,
	},
	staggerDuration = 0.02,
	className,
	onClick,
	...props
}: TextProps) => {
	const [scope, animate] = useAnimate();
	const [blocked, setBlocked] = useState(false);

	const mergeTransition = (
		transition: DynamicAnimationOptions,
		i: number
	) => ({
		...transition,
		delay: i * staggerDuration,
	});

	const shuffledIndices = Array.from(
		{ length: label.length },
		(_, i) => i
	).sort(() => Math.random() - 0.5);

	const hoverStart = debounce(
		() => {
			if (blocked) return;
			setBlocked(true);

			for (let i = 0; i < label.length; i++) {
				const randomIndex = shuffledIndices[i];
				animate(
					".letter-" + randomIndex,
					{
						y: reverse ? "100%" : "-100%",
					},
					mergeTransition(transition, i)
				).then(() => {
					animate(
						".letter-" + randomIndex,
						{
							y: 0,
						},
						{
							duration: 0,
						}
					);
				});

				animate(
					".letter-secondary-" + randomIndex,
					{
						top: "0%",
					},
					mergeTransition(transition, i)
				)
					.then(() => {
						animate(
							".letter-secondary-" + randomIndex,
							{
								top: reverse ? "-100%" : "100%",
							},
							{
								duration: 0,
							}
						);
					})
					.then(() => {
						if (i === label.length - 1) {
							setBlocked(false);
						}
					});
			}
		},
		100,
		{ leading: true, trailing: true }
	);

	return (
		<motion.span
			className={`flex justify-center items-center relative overflow-hidden ${className}`}
			onHoverStart={hoverStart}
			onClick={onClick}
			ref={scope}
			{...props}
		>
			<span className="sr-only">{label}</span>

			{label.split("").map((letter: string, i: number) => {
				return (
					<span
						className="whitespace-pre relative flex"
						key={i + "random-letter-swap"}
					>
						<motion.span
							className={`relative pb-2 letter-${i}`}
							style={{ top: 0 }}
						>
							{letter}
						</motion.span>
						<motion.span
							className={`absolute letter-secondary-${i}`}
							aria-hidden={true}
							style={{ top: reverse ? "-100%" : "100%" }}
						>
							{letter}
						</motion.span>
					</span>
				);
			})}
		</motion.span>
	);
};

const RandomLetterSwapPingPong = ({
	label,
	reverse = true,
	transition = {
		type: "spring",
		duration: 0.8,
	},
	staggerDuration = 0.02,
	className,
	onClick,
	...props
}: TextProps) => {
	const [scope, animate] = useAnimate();
	const [blocked, setBlocked] = useState(false);

	const mergeTransition = (
		transition: DynamicAnimationOptions,
		i: number
	) => ({
		...transition,
		delay: i * staggerDuration,
	});

	const shuffledIndices = Array.from(
		{ length: label.length },
		(_, i) => i
	).sort(() => Math.random() - 0.5);

	const hoverStart = debounce(
		() => {
			if (blocked) return;
			setBlocked(true);

			for (let i = 0; i < label.length; i++) {
				const randomIndex = shuffledIndices[i];
				animate(
					".letter-" + randomIndex,
					{
						y: reverse ? "100%" : "-100%",
					},
					mergeTransition(transition, i)
				);

				animate(
					".letter-secondary-" + randomIndex,
					{
						top: "0%",
					},
					mergeTransition(transition, i)
				);
			}
		},
		100,
		{ leading: true, trailing: true }
	);

	const hoverEnd = debounce(
		() => {
			setBlocked(false);

			for (let i = 0; i < label.length; i++) {
				const randomIndex = shuffledIndices[i];
				animate(
					".letter-" + randomIndex,
					{
						y: 0,
					},
					mergeTransition(transition, i)
				);

				animate(
					".letter-secondary-" + randomIndex,
					{
						top: reverse ? "-100%" : "100%",
					},
					mergeTransition(transition, i)
				);
			}
		},
		100,
		{ leading: true, trailing: true }
	);

	return (
		<motion.span
			className={`flex justify-center items-center relative overflow-hidden  ${className} `}
			onHoverStart={hoverStart}
			onHoverEnd={hoverEnd}
			onClick={onClick}
			ref={scope}
			{...props}
		>
			<span className="sr-only">{label}</span>

			{label.split("").map((letter: string, i: number) => {
				return (
					<span
						className="whitespace-pre relative flex"
						key={i + "random-letter-swap-hover"}
					>
						<motion.span
							className={`relative pb-2 letter-${i}`}
							style={{ top: 0 }}
						>
							{letter}
						</motion.span>
						<motion.span
							className={`absolute letter-secondary-${i}`}
							aria-hidden={true}
							style={{ top: reverse ? "-100%" : "100%" }}
						>
							{letter}
						</motion.span>
					</span>
				);
			})}
		</motion.span>
	);
};

export { RandomLetterSwapForward, RandomLetterSwapPingPong };
```

## Attribution

Source: Fancy Components · Original: https://www.fancycomponents.dev/docs/components/text/random-letter-swap

Adapted from the original. Credit the original author when you ship this.
