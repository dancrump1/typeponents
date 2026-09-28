# Card Hover

Grid of linked title-and-description cards with a rounded highlight panel that follows the pointer.

**Interaction.** Hovering a card fades a soft rounded block in behind it and outlines its border; moving to another card glides that block across to the new one rather than making it reappear.

- Categories: Cards
- Tags: hover
- Import: `@/components/ui/card-hover`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/card-hover-effect

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/card-hover.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` *(required)* | `{ title: string; description: string; link: string; }[]` | — | — |
| `className` | `string` | — | — |

## Usage

```tsx
import { HoverEffect } from "./component";

export default function CardHoverEffectDemo() {
	return (
		<div className="max-w-5xl mx-auto px-8">
			<HoverEffect items={projects} />
		</div>
	);
}
const projects = [
	{
		title: "Stripe",
		description:
			"A technology company that builds economic infrastructure for the internet.",
		link: "https://stripe.com",
	},
	{
		title: "Netflix",
		description:
			"A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
		link: "https://netflix.com",
	},
	{
		title: "Google",
		description:
			"A multinational technology company that specializes in Internet-related services and products.",
		link: "https://google.com",
	},
	{
		title: "Meta",
		description:
			"A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
		link: "https://meta.com",
	},
	{
		title: "Amazon",
		description:
			"A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
		link: "https://amazon.com",
	},
	{
		title: "Microsoft",
		description:
			"A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
		link: "https://microsoft.com",
	},
];
```

## Source

### `components/ui/card-hover.tsx`

```tsx
import React, { useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

// https://ui.aceternity.com/components/card-hover-effect

export const HoverEffect = ({
	items,
	className,
}: {
	items: {
		title: string;
		description: string;
		link: string;
	}[];
	className?: string;
}) => {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
				className
			)}
		>
			{items.map((item, idx) => (
				<Link
					href={item?.link || ""}
					key={item?.link}
					className="relative group  block p-2 h-full w-full"
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className="absolute inset-0 h-full w-full bg-background dark:bg-slate-800/80 block  rounded-3xl"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { duration: 0.15 },
								}}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 },
								}}
							/>
						)}
					</AnimatePresence>
					<Card>
						<CardTitle>{item.title}</CardTitle>
						<CardDescription>{item.description}</CardDescription>
					</Card>
				</Link>
			))}
		</div>
	);
};

export const Card = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"rounded-2xl h-full w-full p-4 overflow-hidden bg-background border border-transparent dark:border-white/20 group-hover:border-slate-700 relative z-20",
				className
			)}
		>
			<div className="relative z-40">
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
};
export const CardTitle = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<h4
			className={cn("text-foreground font-bold tracking-wide mt-4", className)}
		>
			{children}
		</h4>
	);
};
export const CardDescription = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<p
			className={cn(
				"mt-8 text-foreground tracking-wide leading-relaxed text-sm",
				className
			)}
		>
			{children}
		</p>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/card-hover-effect

Adapted from the original. Credit the original author when you ship this.
