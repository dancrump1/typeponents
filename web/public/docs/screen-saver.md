# Screen Saver

- Categories: Backgrounds
- Tags: autoplay
- Import: `@/components/ui/screen-saver`
- Inspiration: Fancy Components (adaptation) — https://www.fancycomponents.dev/docs/components/blocks/screensaver

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/screen-saver.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `containerRef` *(required)* | `React.RefObject<HTMLElement>` | — | — |
| `speed` | `number` | `3` | — |
| `startPosition` | `{ x: number; y: number; }` | `{ x: 0, y: 0 }` | — |
| `startAngle` | `number` | `45` | — |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import React, { useRef } from "react";

import Image from "next/image";

import Screensaver from "./component";

export default function Usage() {
	const screensaverRef = useRef<HTMLDivElement>(null);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div
				className="w-dvw h-dvh bg-background overflow-hidden flex items-center justify-center relative text-foreground dark:text-muted"
				ref={screensaverRef}
			>
				<h1 className="z-30 text-3xl md:text-6xl font-overused-grotesk">
					page not found
				</h1>
				{[
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
				].map((image, index) => (
					<Screensaver
						key={index + "screensaver-example"}
						speed={1}
						startPosition={{
							x: index * 3,
							y: index * 3,
						}}
						startAngle={40}
					>
						<div className="w-20 h-20 md:w-48 md:h-48 overflow-hidden">
							<Image
								{...image}
								width={100}
								height={100}
								src={image}
								alt={`Usage ${index + 1}`}
								className="w-full h-full object-cover"
							/>
						</div>
					</Screensaver>
				))}
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/screen-saver.tsx`

```tsx
"use client";

import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useDimensions } from "@/hooks/use-dimensions";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";

// Credit:
// https://www.fancycomponents.dev/docs/components/blocks/screensaver

type ScreensaverProps = {
	children: React.ReactNode;
	containerRef: React.RefObject<HTMLElement>;
	speed?: number;
	startPosition?: { x: number; y: number }; // x,y as percentages (0-100)
	startAngle?: number; // in degrees
	className?: string;
};

const Screensaver: React.FC<ScreensaverProps> = ({
	children,
	speed = 3,
	startPosition = { x: 0, y: 0 },
	startAngle = 45,
	containerRef,
	className,
}) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const angle = useRef((startAngle * Math.PI) / 180);

	const containerDimensions = useDimensions(containerRef);
	const elementDimensions = useDimensions(elementRef);

	// Set initial position based on container dimensions and percentage
	useEffect(() => {
		if (containerDimensions.width && containerDimensions.height) {
			const initialX =
				(startPosition.x / 100) *
				(containerDimensions.width - (elementDimensions.width || 0));
			const initialY =
				(startPosition.y / 100) *
				(containerDimensions.height - (elementDimensions.height || 0));
			x.set(initialX);
			y.set(initialY);
		}
	}, [containerDimensions, elementDimensions, startPosition]);

	useAnimationFrame(() => {
		const velocity = speed;
		const dx = Math.cos(angle.current) * velocity;
		const dy = Math.sin(angle.current) * velocity;

		let newX = x.get() + dx;
		let newY = y.get() + dy;

		// Check for collisions with container boundaries
		if (
			newX <= 0 ||
			newX + elementDimensions.width >= containerDimensions.width
		) {
			angle.current = Math.PI - angle.current;
			newX = Math.max(
				0,
				Math.min(newX, containerDimensions.width - elementDimensions.width)
			);
		}
		if (
			newY <= 0 ||
			newY + elementDimensions.height >= containerDimensions.height
		) {
			angle.current = -angle.current;
			newY = Math.max(
				0,
				Math.min(
					newY,
					containerDimensions.height - elementDimensions.height
				)
			);
		}

		x.set(newX);
		y.set(newY);
	});

	return (
		<motion.div
			ref={elementRef}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				x,
				y,
			}}
			className={cn("transform will-change-transform", className)}
		>
			{children}
		</motion.div>
	);
};

export default Screensaver;
```

### `hooks/use-dimensions.ts`

```tsx
import { RefObject, useEffect, useState } from "react";

interface Dimensions {
	width: number;
	height: number;
}

export function useDimensions(
	ref: RefObject<HTMLElement | SVGElement>
): Dimensions {
	const [dimensions, setDimensions] = useState<Dimensions>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const updateDimensions = () => {
			if (ref?.current) {
				const { width, height } = ref.current.getBoundingClientRect();
				setDimensions({ width, height });
			}
		};

		updateDimensions();
		window.addEventListener("resize", updateDimensions);

		return () => window.removeEventListener("resize", updateDimensions);
	}, [ref]);

	return dimensions;
}
```

## Attribution

Source: Fancy Components · Original: https://www.fancycomponents.dev/docs/components/blocks/screensaver

Adapted from the original. Credit the original author when you ship this.
