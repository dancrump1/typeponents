# Focus Cards

- Categories: Cards
- Tags: hover
- Import: `@/components/ui/focus-cards`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/focus-cards

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/focus-cards.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `cards` | `Card[]` | `cardsExamples` | — |

## Usage

```tsx
"use client";

import React from "react";

import { FocusCards } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<FocusCards />
		</div>
	);
}
```

## Source

### `components/ui/focus-cards.tsx`

```tsx
"use client";

import React, { useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

// https://ui.aceternity.com/components/focus-cards

export const Card = React.memo(
	({
		card,
		index,
		hovered,
		setHovered,
	}: {
		card: any;
		index: number;
		hovered: number | null;
		setHovered: React.Dispatch<React.SetStateAction<number | null>>;
	}) => (
		<div
			onMouseEnter={() => setHovered(index)}
			onMouseLeave={() => setHovered(null)}
			className={cn(
				"rounded-lg relative bg-background dark:bg-background overflow-hidden h-60 md:h-96 w-full transition-transform duration-300 ease-out",
				hovered !== null && hovered !== index && "blur-xs scale-[0.98]"
			)}
		>
			<Image
				src={card.src}
				alt={card.title}
				fill
				className="object-cover absolute inset-0"
			/>
			<div
				className={cn(
					"absolute inset-0 bg-background/50 flex items-end py-8 px-4 transition-opacity duration-300",
					hovered === index ? "opacity-100" : "opacity-0"
				)}
			>
				<div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-linear-to-b from-background to-background">
					{card.title}
				</div>
			</div>
		</div>
	)
);

Card.displayName = "Card";

type Card = {
	title: string;
	src: string;
};

const cardsExamples = [
	{
		title: "Forest Adventure",
		src: "/itjustworks.jpg",
	},
	{
		title: "Valley of life",
		src: "/itjustworks.jpg",
	},
	{
		title: "Sala behta hi jayega",
		src: "/itjustworks.jpg",
	},
	{
		title: "Camping is for pros",
		src: "/itjustworks.jpg",
	},
	{
		title: "The road not taken",
		src: "/itjustworks.jpg",
	},
	{
		title: "The First Rule",
		src: "/itjustworks.jpg",
	},
];

export function FocusCards({ cards = cardsExamples }: { cards: Card[] }) {
	const [hovered, setHovered] = useState<number | null>(null);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
			{cards.map((card, index) => (
				<Card
					key={card.title}
					card={card}
					index={index}
					hovered={hovered}
					setHovered={setHovered}
				/>
			))}
		</div>
	);
}
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/focus-cards

Adapted from the original. Credit the original author when you ship this.
