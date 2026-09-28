# Stacked Carousel

- Categories: Carousels
- Tags: spring, hover
- Import: `@/components/ui/stacked-carousel`
- Inspiration: Eclair UI (adaptation) — https://eclairui.gopx.dev/components/carousels/stacked-carousel

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/stacked-carousel.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `images` *(required)* | `string[]` | — | — |
| `width` | `number` | `300` | — |
| `height` | `number` | `400` | — |
| `borderColor` | `string` | `"white"` | — |
| `borderWidth` | `number` | `12` | — |
| `backgroundColor` | `string` | `"#e0f1fa"` | — |

## Usage

```tsx
"use client";

import React from "react";

import StackedCarousel from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-full h-full flex justify-center items-center pt-12 pb-4">
				<StackedCarousel
					images={[
						"/itjustworks.jpg",
						"/itjustworks.jpg",
						"/itjustworks.jpg",
						"/itjustworks.jpg",
						"/itjustworks.jpg",
					]}
					width={300}
					height={400}
					borderColor="white"
					borderWidth={8}
				/>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/stacked-carousel.tsx`

```tsx
"use client";

import React, { useCallback, useRef, useState } from "react";

import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Credit:
// https://eclairui.gopx.dev/components/carousels/stacked-carousel

interface StackedCarouselProps {
	images: string[];
	width?: number;
	height?: number;
	borderColor?: string;
	borderWidth?: number;
	backgroundColor?: string;
}

const StackedCarousel: React.FC<StackedCarouselProps> = ({
	images,
	width = 300,
	height = 400,
	borderColor = "white",
	borderWidth = 12,
	backgroundColor = "#e0f1fa",
}) => {
	const [order, setOrder] = useState(images?.map((_, index) => index));
	const [isMoving, setIsMoving] = useState(false);
	const [direction, setDirection] = useState<"left" | "right" | null>(null);
	const animationQueue = useRef<("left" | "right")[]>([]);

	const moveCard = useCallback(
		(moveDirection: "left" | "right") => {
			if (isMoving) {
				animationQueue.current.push(moveDirection);
				return;
			}

			setIsMoving(true);
			setDirection(moveDirection);

			setTimeout(() => {
				setOrder((prevOrder) => {
					const newOrder = [...prevOrder];
					if (moveDirection === "left") {
						const lastItem = newOrder.pop()!;
						newOrder.unshift(lastItem);
					} else {
						const firstItem = newOrder.shift()!;
						newOrder.push(firstItem);
					}
					return newOrder;
				});

				setIsMoving(false);
				setDirection(null);

				if (animationQueue.current.length > 0) {
					const nextDirection = animationQueue.current.shift()!;
					moveCard(nextDirection);
				}
			}, 300);
		},
		[isMoving]
	);

	const getRotation = (index: number) => {
		const rotations = [0, -10, 10, 20];
		return rotations[index % rotations.length];
	};

	return (
		<div
			style={{ width: `${width}px`, height: `${height}px` }}
			className="relative"
		>
			<div
				style={{ width: "100%", height: `${height - 100}px` }}
				className="relative"
			>
				<AnimatePresence>
					{images?.map((src, index) => {
						const orderIndex = order.indexOf(index);
						const isTop = orderIndex === order.length - 1;
						const isBottom = orderIndex === 0;
						const isAnimating =
							(direction === "left" && isTop) ||
							(direction === "right" && isBottom);

						return (
							<motion.div
								key={src + index + "stackedcarousel"}
								style={{
									width: "100%",
									height: "100%",
									position: "absolute",
									top: 0,
									left: 0,
								}}
								animate={{
									rotate: isMoving ? 0 : getRotation(orderIndex),
									x: isAnimating
										? direction === "left"
											? "-100%"
											: "100%"
										: "0%",
									zIndex: orderIndex,
								}}
								transition={{
									duration: 0.3,
									ease: [0.25, 0.1, 0.25, 1],
									rotate: {
										type: "spring",
										stiffness: 200,
										damping: 12,
										mass: 1,
									},
								}}
							>
								<div
									style={{
										width: "100%",
										height: "100%",
										position: "relative",
										borderRadius: "1.5rem",
										border: `${borderWidth}px solid ${borderColor}`,
										overflow: "hidden",
										boxShadow:
											"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
									}}
								>
									<Image
										src={src}
										alt={`Image ${index + 1}`}
										fill
										style={{ objectFit: "cover" }}
										sizes={`${width}px`}
									/>
								</div>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>
			<div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 mt-4">
				<button
					onClick={() => moveCard("left")}
					className="bg-background bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
					aria-label="Previous image"
				>
					<ChevronLeft className="w-6 h-6 text-foreground" />
				</button>
				<button
					onClick={() => moveCard("right")}
					className="bg-background bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
					aria-label="Next image"
				>
					<ChevronRight className="w-6 h-6 text-foreground" />
				</button>
			</div>
		</div>
	);
};

export default StackedCarousel;
```

## Attribution

Source: Eclair UI · Original: https://eclairui.gopx.dev/components/carousels/stacked-carousel

Adapted from the original. Credit the original author when you ship this.
