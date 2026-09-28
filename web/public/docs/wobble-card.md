# Wobble Card

- Categories: Cards, Special Effects & FX
- Tags: hover, cursor-tracking
- Import: `@/components/ui/wobble-card`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/wobble-card

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/wobble-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `containerClassName` | `string` | — | — |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import Image from "next/image";

import WobbleCard from "./component";

export default function WobbleCardUsage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
				<WobbleCard
					containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
					className=""
				>
					<div className="max-w-xs">
						<h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-secondary">
							Gippity AI powers the entire universe
						</h2>
						<p className="mt-4 text-left  text-base/6 text-secondary">
							With over 100,000 mothly active bot users, Gippity AI is
							the most popular AI platform for developers.
						</p>
					</div>
					<Image
						src="/itjustworks.jpg"
						width={500}
						height={500}
						alt="linear demo image"
						className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
					/>
				</WobbleCard>
				<WobbleCard containerClassName="col-span-1 min-h-[300px]">
					<h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-secondary">
						No shirt, no shoes, no weapons.
					</h2>
					<p className="mt-4 max-w-104 text-left  text-base/6 text-secondary">
						If someone yells “stop!”, goes limp, or taps out, the fight is
						over.
					</p>
				</WobbleCard>
				<WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
					<div className="max-w-sm">
						<h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-secondary">
							Signup for blazing-fast cutting-edge state of the art
							Gippity AI wrapper today!
						</h2>
						<p className="mt-4 max-w-104 text-left  text-base/6 text-secondary">
							With over 100,000 mothly active bot users, Gippity AI is
							the most popular AI platform for developers.
						</p>
					</div>
					<Image
						src="/itjustworks.jpg"
						width={500}
						height={500}
						alt="linear demo image"
						className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
					/>
				</WobbleCard>
			</div>
		</div>
	);
}
```

## Source

### `components/ui/wobble-card.tsx`

```tsx
"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// https://ui.aceternity.com/components/wobble-card

const WobbleCard = ({
	children,
	containerClassName,
	className,
}: {
	children: React.ReactNode;
	containerClassName?: string;
	className?: string;
}) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
		const { clientX, clientY } = event;
		const rect = event.currentTarget.getBoundingClientRect();
		const x = (clientX - (rect.left + rect.width / 2)) / 20;
		const y = (clientY - (rect.top + rect.height / 2)) / 20;
		setMousePosition({ x, y });
	};
	return (
		<motion.section
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => {
				setIsHovering(false);
				setMousePosition({ x: 0, y: 0 });
			}}
			style={{
				transform: isHovering
					? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
					: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
				transition: "transform 0.1s ease-out",
			}}
			className={cn(
				"mx-auto w-full bg-indigo-800  relative rounded-2xl overflow-hidden",
				containerClassName
			)}
		>
			<div
				className="relative  h-full bg-[radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden"
				style={{
					boxShadow:
						"0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
				}}
			>
				<motion.div
					style={{
						transform: isHovering
							? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
							: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
						transition: "transform 0.1s ease-out",
					}}
					className={cn("h-full px-4 py-20 sm:px-10", className)}
				>
					{children}
				</motion.div>
			</div>
		</motion.section>
	);
};

export default WobbleCard;
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/wobble-card

Adapted from the original. Credit the original author when you ship this.
