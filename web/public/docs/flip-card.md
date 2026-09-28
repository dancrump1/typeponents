# Flip Card

- Categories: Cards
- Tags: spring, hover
- Import: `@/components/ui/flip-card`
- Inspiration: berlix.vercel.app (adaptation) — https://berlix.vercel.app/docs/flip-card

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/flip-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `front` *(required)* | `ReactNode` | — | — |
| `back` *(required)* | `ReactNode` | — | — |
| `duration` | `number` | `0.3` | — |
| `flipDirection` | `"horizontal" | "vertical"` | `"horizontal"` | — |
| `flipRotation` | `"forward" | "reverse"` | `"forward"` | — |
| `className` | `string` | — | — |
| `panelClassName` | `string` | — | — |

## Usage

```tsx
import { FlipCard } from "./component";

export default function FlipCardBasic() {
	return (
		<>
			<FlipCard
				front={<Front />}
				back={<Back />}
				panelClassName=""
				flipDirection="horizontal"
				flipRotation="forward"
			/>
			<FlipCard
				front={<Front />}
				back={<Back />}
				className="w-[350px]"
				panelClassName="rounded-2xl bg-background"
				flipDirection="vertical"
				flipRotation="reverse"
			/>
		</>
	);
}

export const Front = () => {
	return (
		<div className="w-full h-full relative flex items-center justify-center">
			<img
				src="/itjustworks.jpg"
				alt="front image"
				className="w-full h-full absolute inset-0"
			/>
			<h3 className="text-secondary text-5xl font-semibold uppercase font-mono relative">
				BLOOM
			</h3>
		</div>
	);
};

export const Back = () => {
	return (
		<div className="w-full h-full relative flex flex-col items-center justify-center gap-3 p-4 bg-background dark:bg-background text-secondary dark:text-secondary">
			<h3 className="text-xl font-bold uppercase tracking-widest">
				Explore More
			</h3>
			<p className="text-sm text-center text-secondary dark:text-secondary">
				Dive into our exclusive collection of hand-crafted visuals.
			</p>
			<button className="mt-2 px-4 py-1.5 text-sm font-medium bg-background dark:bg-background text-secondary dark:text-secondary rounded-full hover:opacity-90 transition cursor-pointer">
				Browse Now
			</button>
		</div>
	);
};
```

## Source

### `components/ui/flip-card.tsx`

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "motion/react";

// Credit:
// https://berlix.vercel.app/docs/flip-card

interface FlipCardProps {
	front: React.ReactNode;
	back: React.ReactNode;
	duration?: number;
	flipDirection?: "horizontal" | "vertical";
	flipRotation?: "forward" | "reverse";
	className?: string;
	panelClassName?: string;
}

export const FlipCard = ({
	front,
	back,
	duration = 0.3,
	className,
	panelClassName,
	flipDirection = "horizontal",
	flipRotation = "forward",
}: FlipCardProps) => {
	const rotate = useMotionValue(0);
	const rotateSpring = useSpring(rotate, {
		stiffness: (1 / duration) * 50,
		damping: 30,
	});

	const handleMouseEnter = () => {
		const isVertical = flipDirection === "vertical";
		const isForward = flipRotation === "forward";

		const angle = isVertical
			? isForward
				? -180
				: 180
			: isForward
				? 180
				: -180;

		rotate.set(angle);
	};
	const handleMouseLeave = () => rotate.set(0);

	const rotateStyle =
		flipDirection === "horizontal"
			? { rotateY: rotateSpring }
			: { rotateX: rotateSpring };

	const backfaceTransform =
		flipDirection === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)";

	return (
		<motion.div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				perspective: 1000,
			}}
			className={cn("relative w-56 h-72", className)}
		>
			<motion.div
				style={{
					...rotateStyle,
					width: "100%",
					height: "100%",
					transformStyle: "preserve-3d",
					position: "relative",
				}}
			>
				<div
					className={cn(
						"absolute w-full h-full top-0 left-0 rounded-xl overflow-hidden shadow-md bg-background backface-hidden",
						panelClassName
					)}
				>
					{front}
				</div>

				<div
					style={{ transform: backfaceTransform }}
					className={cn(
						"absolute w-full h-full top-0 left-0  rounded-xl overflow-hidden shadow-md bg-background backface-hidden",
						panelClassName
					)}
				>
					{back}
				</div>
			</motion.div>
		</motion.div>
	);
};
```

## Attribution

Source: berlix.vercel.app · Original: https://berlix.vercel.app/docs/flip-card

Adapted from the original. Credit the original author when you ship this.
