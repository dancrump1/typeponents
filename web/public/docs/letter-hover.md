# Letter Hover

- Categories: Text
- Tags: spring, hover
- Import: `@/components/ui/letter-hover`
- Inspiration: Fancy Components (adaptation) — https://www.fancycomponents.dev/docs/components/text/letter-swap

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/letter-hover.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Registry dependencies

- `random-letter-swap-hover`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `label` *(required)* | `string` | — | — |
| `reverse` | `boolean` | `true` | — |
| `transition` | `any` | `{ type: "spring", duration: 0.7, }` | — |
| `staggerDuration` | `number` | `0.03` | — |
| `staggerFrom` | `number | "first" | "last" | "center"` | `"first"` | — |
| `className` | `string` | — | — |
| `onClick` | `(() => void)` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import LetterSwapForward from "./component";
import { RandomLetterSwapPingPong } from "@/registry/components/random-letter-swap-hover/component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-dvw h-dvh rounded-lg bg-background text-xl md:text-3xl  flex flex-col items-center justify-center font-calendas">
				<div className=" p-12 text-secondary rounded-xl align-text-top  gap-y-1 md:gap-y-2 flex flex-col">
					<LetterSwapForward
						label="Hover me chief!"
						reverse={true}
						className="italic"
					/>
					<LetterSwapForward
						label="{awesome}"
						reverse={false}
						className="font-bold"
					/>
					<LetterSwapForward
						label="Good day!"
						staggerFrom={"center"}
						className="mono"
					/>
					<RandomLetterSwapPingPong
						label="More text?"
						staggerFrom={"center"}
						reverse={false}
						className="font-overused-grotesk font-bold"
					/>
					<RandomLetterSwapPingPong
						label="oh, seriously?!"
						staggerFrom={"last"}
					/>
				</div>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/letter-hover.tsx`

```tsx
"use client";

import { useState } from "react";

import {
	DynamicAnimationOptions,
	motion,
	stagger,
	useAnimate,
} from "motion/react";

// Credit:
// https://www.fancycomponents.dev/docs/components/text/letter-swap

interface TextProps {
	label: string;
	reverse?: boolean;
	transition?: DynamicAnimationOptions;
	staggerDuration?: number;
	staggerFrom?: "first" | "last" | "center" | number;
	className?: string;
	onClick?: () => void;
}

const LetterSwapForward = ({
	label,
	reverse = true,
	transition = {
		type: "spring",
		duration: 0.7,
	},
	staggerDuration = 0.03,
	staggerFrom = "first",
	className,
	onClick,
	...props
}: TextProps) => {
	const [scope, animate] = useAnimate();
	const [blocked, setBlocked] = useState(false);

	const hoverStart = () => {
		if (blocked) return;

		setBlocked(true);

		// Function to merge user transition with stagger and delay
		const mergeTransition = (baseTransition: DynamicAnimationOptions) => ({
			...baseTransition,
			delay: stagger(staggerDuration, {
				from: staggerFrom,
			}),
		});

		animate(
			".letter",
			{ y: reverse ? "100%" : "-100%" },
			mergeTransition(transition)
		).then(() => {
			animate(
				".letter",
				{
					y: 0,
				},
				{
					duration: 0,
				}
			).then(() => {
				setBlocked(false);
			});
		});

		animate(
			".letter-secondary",
			{
				top: "0%",
			},
			mergeTransition(transition)
		).then(() => {
			animate(
				".letter-secondary",
				{
					top: reverse ? "-100%" : "100%",
				},
				{
					duration: 0,
				}
			);
		});
	};

	return (
		<span
			className={`flex justify-center items-center relative overflow-hidden  ${className} `}
			onMouseEnter={hoverStart}
			onClick={onClick}
			ref={scope}
			{...props}
		>
			<span className="sr-only">{label}</span>

			{label.split("").map((letter: string, i: number) => {
				return (
					<span
						className="whitespace-pre relative flex"
						key={i + "letter-hover"}
					>
						<motion.span className={`relative letter`} style={{ top: 0 }}>
							{letter}
						</motion.span>
						<motion.span
							className="absolute letter-secondary "
							aria-hidden={true}
							style={{ top: reverse ? "-100%" : "100%" }}
						>
							{letter}
						</motion.span>
					</span>
				);
			})}
		</span>
	);
};

export default LetterSwapForward;
```

## Attribution

Source: Fancy Components · Original: https://www.fancycomponents.dev/docs/components/text/letter-swap

Adapted from the original. Credit the original author when you ship this.
