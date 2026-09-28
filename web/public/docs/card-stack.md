# Card Stack

Stack of testimonial cards with the ones behind peeking out above, slightly smaller each step back.

**Interaction.** Runs on its own — every few seconds the back card slides up to the front and the rest shuffle down a place, cycling through the quotes without any input.

- Categories: Cards
- Tags: autoplay
- Import: `@/components/ui/card-stack`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/card-stack

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/card-stack.json
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

import { CardStack } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CardStack />
		</div>
	);
}
```

## Source

### `components/ui/card-stack.tsx`

```tsx
"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

let interval: any;

type Card = {
	id: number;
	name: string;
	designation: string;
	content: React.ReactNode;
};

// https://ui.aceternity.com/components/card-stack

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<span
			className={cn(
				"font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/20 dark:text-emerald-500 px-1 py-0.5",
				className
			)}
		>
			{children}
		</span>
	);
};

const CARDS = [
	{
		id: 0,
		name: "Manu Arora",
		designation: "Senior Software Engineer",
		content: (
			<p>
				These cards are amazing, <Highlight>I want to use them</Highlight>{" "}
				in my project. Framer motion is a godsend ngl tbh fam 🙏
			</p>
		),
	},
	{
		id: 1,
		name: "Elon Musk",
		designation: "Senior Shitposter",
		content: (
			<p>
				I dont like this Twitter thing,{" "}
				<Highlight>deleting it right away</Highlight> because yolo. Instead,
				I would like to call it <Highlight>X.com</Highlight> so that it can
				easily be confused with adult sites.
			</p>
		),
	},
	{
		id: 2,
		name: "Tyler Durden",
		designation: "Manager Project Mayhem",
		content: (
			<p>
				The first rule of
				<Highlight>Fight Club</Highlight> is that you do not talk about
				fight club. The second rule of
				<Highlight>Fight club</Highlight> is that you DO NOT TALK about
				fight club.
			</p>
		),
	},
];

export const CardStack = ({
	items = CARDS,
	offset,
	scaleFactor,
}: {
	items?: Card[];
	offset?: number;
	scaleFactor?: number;
}) => {
	const CARD_OFFSET = offset || 10;
	const SCALE_FACTOR = scaleFactor || 0.06;
	const [cards, setCards] = useState<Card[]>(items);

	useEffect(() => {
		startFlipping();

		return () => clearInterval(interval);
	}, []);
	const startFlipping = () => {
		interval = setInterval(() => {
			setCards((prevCards: Card[]) => {
				const newArray = [...prevCards]; // create a copy of the array
				newArray.unshift(newArray.pop()!); // move the last element to the front
				return newArray;
			});
		}, 5000);
	};

	return (
		<div className="relative  h-60 w-60 md:h-60 md:w-96">
			{cards.map((card, index) => {
				return (
					<motion.div
						key={card.id}
						className="absolute dark:bg-background bg-background h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/10  shadow-black/10 dark:shadow-white/5 flex flex-col justify-between"
						style={{
							transformOrigin: "top center",
						}}
						animate={{
							top: index * -CARD_OFFSET,
							scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
							zIndex: cards.length - index, //  decrease z-index for the cards that are behind
						}}
					>
						<div className="font-normal text-foreground dark:text-foreground">
							{card.content}
						</div>
						<div>
							<p className="text-foreground font-medium dark:text-foreground">
								{card.name}
							</p>
							<p className="text-foreground font-normal dark:text-foreground">
								{card.designation}
							</p>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/card-stack

Adapted from the original. Credit the original author when you ship this.
