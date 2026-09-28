# Layout Grid

- Categories: Grids & Layouts
- Import: `@/components/ui/layout-grid`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/layout-grid

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/layout-grid.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `cards` *(required)* | `Card[]` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { LayoutGrid } from "./component";

function LayoutGridDemo() {
	return (
		<div className="h-screen py-20 w-full">
			<LayoutGrid cards={cards} />
		</div>
	);
}

const SkeletonOne = () => {
	return (
		<div>
			<p className="font-bold md:text-4xl text-xl text-secondary">
				House in the woods
			</p>
			<p className="font-normal text-base text-secondary"></p>
			<p className="font-normal text-base my-4 max-w-lg text-secondary">
				A serene and tranquil retreat, this house in the woods offers a
				peaceful escape from the hustle and bustle of city life.
			</p>
		</div>
	);
};

const SkeletonTwo = () => {
	return (
		<div>
			<p className="font-bold md:text-4xl text-xl text-secondary">
				House above the clouds
			</p>
			<p className="font-normal text-base text-secondary"></p>
			<p className="font-normal text-base my-4 max-w-lg text-secondary">
				Perched high above the world, this house offers breathtaking views
				and a unique living experience. It&apos;s a place where the sky
				meets home, and tranquility is a way of life.
			</p>
		</div>
	);
};
const SkeletonThree = () => {
	return (
		<div>
			<p className="font-bold md:text-4xl text-xl text-secondary">
				Greens all over
			</p>
			<p className="font-normal text-base text-secondary"></p>
			<p className="font-normal text-base my-4 max-w-lg text-secondary">
				A house surrounded by greenery and nature&apos;s beauty. It&apos;s
				the perfect place to relax, unwind, and enjoy life.
			</p>
		</div>
	);
};
const SkeletonFour = () => {
	return (
		<div>
			<p className="font-bold md:text-4xl text-xl text-secondary">
				Rivers are serene
			</p>
			<p className="font-normal text-base text-secondary"></p>
			<p className="font-normal text-base my-4 max-w-lg text-secondary">
				A house by the river is a place of peace and tranquility. It&apos;s
				the perfect place to relax, unwind, and enjoy life.
			</p>
		</div>
	);
};

export const cards = [
	{
		id: 1,
		content: <SkeletonOne />,
		className: "md:col-span-2",
		thumbnail: "/itjustworks.jpg",
	},
	{
		id: 2,
		content: <SkeletonTwo />,
		className: "col-span-1",
		thumbnail: "/itjustworks.jpg",
	},
	{
		id: 3,
		content: <SkeletonThree />,
		className: "col-span-1",
		thumbnail: "/itjustworks.jpg",
	},
	{
		id: 4,
		content: <SkeletonFour />,
		className: "md:col-span-2",
		thumbnail: "/itjustworks.jpg",
	},
];

export default LayoutGridDemo;
```

## Source

### `components/ui/layout-grid.tsx`

```tsx
"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// https://ui.aceternity.com/components/layout-grid

type Card = {
	id: number;
	content: JSX.Element | React.ReactNode | string;
	className: string;
	thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
	const [selected, setSelected] = useState<Card | null>(null);
	const [lastSelected, setLastSelected] = useState<Card | null>(null);

	const handleClick = (card: Card) => {
		setLastSelected(selected);
		setSelected(card);
	};

	const handleOutsideClick = () => {
		setLastSelected(selected);
		setSelected(null);
	};

	return (
		<div className="relative w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 ">
			{cards.map((card, i) => (
				<div key={i + "layout-grid"} className={cn(card.className, "")}>
					<motion.div
						onClick={() => handleClick(card)}
						className={cn(
							card.className,
							"relative overflow-hidden",
							selected?.id === card.id
								? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-40 flex justify-center items-center flex-wrap flex-col"
								: lastSelected?.id === card.id
									? "z-40 bg-background rounded-xl h-full w-full"
									: "bg-background rounded-xl h-full w-full"
						)}
						layout
					>
						{selected?.id === card.id && (
							<SelectedCard selected={selected} />
						)}
						<BlurImage card={card} />
					</motion.div>
				</div>
			))}
			<motion.div
				onClick={handleOutsideClick}
				className={cn(
					"absolute h-full w-full left-0 top-0 bg-background opacity-0 z-10",
					selected?.id ? "pointer-events-auto" : "pointer-events-none"
				)}
				animate={{ opacity: selected?.id ? 0.3 : 0 }}
			/>
		</div>
	);
};

const BlurImage = ({ card }: { card: Card }) => {
	return (
		<img
			src={card.thumbnail}
			height="500"
			width="500"
			className={
				"blur-none object-cover object-top absolute inset-0 h-full w-full transition duration-200"
			}
			alt="thumbnail"
		/>
	);
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
	return (
		<div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-60">
			<motion.div
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 0.6,
				}}
				className="absolute inset-0 h-full w-full bg-background opacity-60 z-10"
			/>
			<motion.div
				initial={{
					opacity: 0,
					y: 100,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
				className="relative px-8 pb-4 z-70"
			>
				{selected?.content}
			</motion.div>
		</div>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/layout-grid

Adapted from the original. Credit the original author when you ship this.
