# Carousel Stack

Carousel that keeps its slides in a stack, the upcoming ones peeking out below the top card, with back and forward arrows.

**Interaction.** Clicking forward drops the top card away and lifts the next one up into place while the stack behind shifts up a step; clicking back reverses it, and the arrows grey out at either end.

- Categories: Carousels
- Import: `@/components/ui/carousel-stack`
- Inspiration: Star UI (adaptation) — https://starui.link/docs/components/stack-card

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/carousel-stack.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `cards` *(required)* | `React.ReactNode[]` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import Image from "next/image";

import { StackCard } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<StackCard
				cards={[
					<div
						key="one"
						className="w-80 rounded-md p-5 bg-blue-100 border-2 border-blue-300 space-y-2 shadow-lg shadow-blue-200"
					>
						<p className="text-sm uppercase">Feature #1</p>
						<h3 className="text-lg text-balance font-semibold">
							Introduce a feature and its benefit.
						</h3>
						<div className="aspect-video grid place-items-center bg-background rounded-md">
							<Image
								width={100}
								height={100}
								size={64}
								className="text-secondary"
								src="/itjustworks.jpg"
							/>
						</div>
						<p className="text-sm">
							Explain how the feature provide value and benefit your
							customers. Keep it short and sweet.
						</p>
					</div>,
					<div
						key="tow"
						className="w-80 rounded-md p-5 bg-amber-100 border-2 border-amber-300 space-y-2 shadow-lg shadow-amber-200"
					>
						<p className="text-sm uppercase">Feature #2</p>
						<h3 className="text-lg text-balance font-semibold">
							Introduce a feature and its benefit.
						</h3>
						<div className="aspect-video grid place-items-center bg-background rounded-md">
							<Image
								width={100}
								height={100}
								size={64}
								className="text-secondary"
								src="/itjustworks.jpg"
							/>
						</div>
						<p className="text-sm">
							Explain how the feature provide value and benefit your
							customers. Keep it short and sweet.
						</p>
					</div>,
					<div
						key="three"
						className="w-80 rounded-md p-5 bg-green-100 border-2 border-green-300 space-y-2 shadow-lg shadow-green-200"
					>
						<p className="text-sm uppercase">Feature #3</p>
						<h3 className="text-lg text-balance font-semibold">
							Introduce a feature and its benefit.
						</h3>
						<div className="aspect-video grid place-items-center bg-background rounded-md">
							<Image
								src="/itjustworks.jpg"
								width={100}
								height={100}
								size={64}
								className="text-secondary"
							/>
						</div>
						<p className="text-sm">
							Explain how the feature provide value and benefit your
							customers. Keep it short and sweet.
						</p>
					</div>,
				]}
			/>
		</div>
	);
}
```

## Source

### `components/ui/carousel-stack.tsx`

```tsx
import type React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

// Credit:
// https://starui.link/docs/components/stack-card

export interface StackCard extends React.ComponentPropsWithRef<"div"> {
	cards: React.ReactNode[];
}

export function StackCard({ cards, className, ...props }: StackCard) {
	const [current, setCurrent] = useState(0);

	return (
		<div className={cn("flex flex-col", className)} {...props}>
			<div className="relative">
				{cards.map((card, index) => (
					<motion.div
						key={index + "carousel-stack"}
						initial={false}
						className={cn(
							index > 0 && "absolute bottom-0 left-0 w-full",
							current < index && "pointer-events-none"
						)}
						animate={{
							opacity: index <= current ? 1 : 0,
							y: (index - current) * 28,
							scale: 1 + (index - current) * 0.08,
						}}
					>
						{card}
					</motion.div>
				))}
			</div>
			<div className="mt-5 flex items-center justify-center gap-5">
				<button
					type="button"
					className="bg-background text-foreground rounded-full p-2 disabled:bg-background disabled:cursor-not-allowed active:scale-90 transition-transform disabled:active:scale-100"
					disabled={current === 0}
					onClick={() => setCurrent((prev) => prev - 1)}
				>
					<ArrowLeft size={20} />
				</button>
				<button
					type="button"
					className="bg-background text-foreground rounded-full p-2 disabled:bg-background disabled:cursor-not-allowed active:scale-90 transition-transform disabled:active:scale-100"
					disabled={current === cards.length - 1}
					onClick={() => setCurrent((prev) => prev + 1)}
				>
					<ArrowRight size={20} />
				</button>
			</div>
		</div>
	);
}
```

## Attribution

Source: Star UI · Original: https://starui.link/docs/components/stack-card

Adapted from the original. Credit the original author when you ship this.
