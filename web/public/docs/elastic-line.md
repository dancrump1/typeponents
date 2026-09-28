# Elastic Line

- Categories: Special Effects & FX
- Tags: spring, autoplay
- Import: `@/components/ui/elastic-line/component`
- Inspiration: Fancy Components (adaptation) — https://www.fancycomponents.dev/docs/components/physics/elastic-line

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/elastic-line.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `isVertical` | `boolean` | `false` | — |
| `grabThreshold` | `number` | `5` | — |
| `releaseThreshold` | `number` | `100` | — |
| `strokeWidth` | `number` | `1` | — |
| `transition` | `ValueAnimationTransition<any>` | `{ type: "spring", stiffness: 400, dam…` | — |
| `animateInTransition` | `ValueAnimationTransition<any>` | `{ duration: 0.3, ease: "easeInOut", }` | — |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import ElasticLine from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-full px-6 sm:px-8 md:px-12">
				<ElasticLine
					releaseThreshold={50}
					strokeWidth={1}
					animateInTransition={{
						type: "spring",
						stiffness: 300,
						damping: 30,
						delay: 0.15,
					}}
				/>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/elastic-line/component.tsx`

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

import { useDimensions } from "@/hooks/use-dimensions";
import { useElasticLineEvents } from "./use-elastice-line-events";
import {
	animate,
	motion,
	useAnimationFrame,
	useMotionValue,
	ValueAnimationTransition,
} from "motion/react";

// Credit:
// https://www.fancycomponents.dev/docs/components/physics/elastic-line

interface ElasticLineProps {
	isVertical?: boolean;
	grabThreshold?: number;
	releaseThreshold?: number;
	strokeWidth?: number;
	transition?: ValueAnimationTransition;
	animateInTransition?: ValueAnimationTransition;
	className?: string;
}

const ElasticLine: React.FC<ElasticLineProps> = ({
	isVertical = false,
	grabThreshold = 5,
	releaseThreshold = 100,
	strokeWidth = 1,
	transition = {
		type: "spring",
		stiffness: 400,
		damping: 5,
	},
	animateInTransition = {
		duration: 0.3,
		ease: "easeInOut",
	},
	className,
}) => {
	const containerRef = useRef<SVGSVGElement>(null);
	const dimensions = useDimensions(containerRef);
	const pathRef = useRef<SVGPathElement>(null);
	const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

	// Clamp releaseThreshold to container dimensions
	const clampedReleaseThreshold = Math.min(
		releaseThreshold,
		isVertical ? dimensions.width / 2 : dimensions.height / 2
	);

	const { isGrabbed, controlPoint } = useElasticLineEvents(
		containerRef,
		isVertical,
		grabThreshold,
		clampedReleaseThreshold
	);

	const x = useMotionValue(dimensions.width / 2);
	const y = useMotionValue(dimensions.height / 2);
	const pathLength = useMotionValue(0);

	useEffect(() => {
		// Initial draw animation
		if (!hasAnimatedIn && dimensions.width > 0 && dimensions.height > 0) {
			animate(pathLength, 1, {
				...animateInTransition,
				onComplete: () => setHasAnimatedIn(true),
			});
		}
		x.set(dimensions.width / 2);
		y.set(dimensions.height / 2);
	}, [dimensions, hasAnimatedIn]);

	useEffect(() => {
		if (!isGrabbed && hasAnimatedIn) {
			animate(x, dimensions.width / 2, transition);
			animate(y, dimensions.height / 2, transition);
		}
	}, [isGrabbed]);

	useAnimationFrame(() => {
		if (isGrabbed) {
			x.set(controlPoint.x);
			y.set(controlPoint.y);
		}

		const controlX = hasAnimatedIn ? x.get() : dimensions.width / 2;
		const controlY = hasAnimatedIn ? y.get() : dimensions.height / 2;

		pathRef.current?.setAttribute(
			"d",
			isVertical
				? `M${dimensions.width / 2} 0Q${controlX} ${controlY} ${
						dimensions.width / 2
					} ${dimensions.height}`
				: `M0 ${dimensions.height / 2}Q${controlX} ${controlY} ${
						dimensions.width
					} ${dimensions.height / 2}`
		);
	});

	return (
		<svg
			ref={containerRef}
			className={`w-full ${className}`}
			viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
			preserveAspectRatio="none"
		>
			<motion.path
				ref={pathRef}
				stroke="currentColor"
				strokeWidth={strokeWidth}
				initial={{ pathLength: 0 }}
				style={{ pathLength }}
				fill="none"
			/>
		</svg>
	);
};

export default ElasticLine;
```

### `components/ui/elastic-line/use-elastice-line-events.ts`

```tsx
import { useEffect, useState } from "react"
import { useMousePosition } from "@/lib/elastic-line-position";
import { useDimensions } from "@/hooks/use-dimensions";



interface ElasticLineEvents {
    isGrabbed: boolean
    controlPoint: { x: number; y: number }
}

export function useElasticLineEvents(
    containerRef: React.RefObject<SVGSVGElement>,
    isVertical: boolean,
    grabThreshold: number,
    releaseThreshold: number
): ElasticLineEvents {
    const mousePosition = useMousePosition(containerRef)
    const dimensions = useDimensions(containerRef)
    const [isGrabbed, setIsGrabbed] = useState(false)
    const [controlPoint, setControlPoint] = useState({
        x: dimensions.width / 2,
        y: dimensions.height / 2,
    })

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = dimensions
            const x = mousePosition.x
            const y = mousePosition.y

            // Check if mouse is outside container bounds
            const isOutsideBounds = x < 0 || x > width || y < 0 || y > height

            if (isOutsideBounds) {
                setIsGrabbed(false)
                return
            }

            let distance: number
            let newControlPoint: { x: number; y: number }

            if (isVertical) {
                const midX = width / 2
                distance = Math.abs(x - midX)
                newControlPoint = {
                    x: midX + 2.2 * (x - midX),
                    y: y,
                }
            } else {
                const midY = height / 2
                distance = Math.abs(y - midY)
                newControlPoint = {
                    x: x,
                    y: midY + 2.2 * (y - midY),
                }
            }

            setControlPoint(newControlPoint)

            if (!isGrabbed && distance < grabThreshold) {
                setIsGrabbed(true)
            } else if (isGrabbed && distance > releaseThreshold) {
                setIsGrabbed(false)
            }
        }
    }, [mousePosition, isVertical, isGrabbed, grabThreshold, releaseThreshold])

    return { isGrabbed, controlPoint }
}
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

### `lib/elastic-line-position.ts`

```tsx
import { RefObject, useEffect, useState } from "react"

export const useMousePosition = (
    containerRef?: RefObject<HTMLElement | SVGElement>
) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const updatePosition = (x: number, y: number) => {
            if (containerRef && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const relativeX = x - rect.left
                const relativeY = y - rect.top

                // Calculate relative position even when outside the container
                setPosition({ x: relativeX, y: relativeY })
            } else {
                setPosition({ x, y })
            }
        }

        const handleMouseMove = (ev: MouseEvent) => {
            updatePosition(ev.clientX, ev.clientY)
        }

        const handleTouchMove = (ev: TouchEvent) => {
            const touch = ev.touches[0]
            updatePosition(touch.clientX, touch.clientY)
        }

        // Listen for both mouse and touch events
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("touchmove", handleTouchMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("touchmove", handleTouchMove)
        }
    }, [containerRef])

    return position
}
```

## Attribution

Source: Fancy Components · Original: https://www.fancycomponents.dev/docs/components/physics/elastic-line

Adapted from the original. Credit the original author when you ship this.
