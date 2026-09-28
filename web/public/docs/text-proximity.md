# Text Proximity

- Categories: Text
- Tags: autoplay
- Import: `@/components/ui/text-proximity`
- Inspiration: Fancy Components (adaptation) — https://www.fancycomponents.dev/docs/components/text/text-cursor-proximity

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-proximity.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import React from "react";

import TextCursorProximity from "./component";
import { ASCII } from "@/lib/example-data";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="relative h-full w-full cursor-pointer overflow-hidden  justify-start items-start shadow-lg flex bg-background text-secondary">
				<div className="flex flex-col justify-center uppercase leading-none pt-4 pl-6">
					<TextCursorProximity
						label="DIGITAL"
						className=" text-3xl will-change-transform sm:text-6xl md:text-6xl lg:text-7xl font-overusedGrotesk"
						styles={{
							transform: {
								from: "scale(1)",
								to: "scale(1.4)",
							},
							color: {
								from: "#ffffff",
								to: "#ff87c1",
							},
						}}
						falloff="gaussian"
						radius={100}
					/>
					<TextCursorProximity
						label="WORKSHOP"
						className="leading-none text-3xl will-change-transform sm:text-6xl md:text-6xl lg:text-7xl font-overusedGrotesk"
						styles={{
							transform: {
								from: "scale(1)",
								to: "scale(1.4)",
							},
							color: {
								from: "#ffffff",
								to: "#ff87c1",
							},
						}}
						falloff="gaussian"
						radius={100}
					/>
				</div>

				<div className="absolute bottom-2 flex w-full justify-between px-6">
					{ASCII.map((hand, i) => (
						<span
							key={i + "proximity-example"}
							className="text-2xl opacity-80"
						>
							{hand}
						</span>
					))}
				</div>

				<TextCursorProximity
					className="absolute top-6 right-6 hidden sm:block text-xs "
					label="15/01/2025"
					styles={{
						transform: {
							from: "scale(1)",
							to: "scale(1.4)",
						},
						color: {
							from: "#ffffff",
							to: "#ff87c1",
						},
					}}
					falloff="linear"
					radius={10}
				/>
			</div>

			{/* this is the important stuff */}
			<div className="w-full h-full items-center justify-center grid text-justify">
				<TextCursorProximity
					label={`Just as every problem is novel and different from others. so the grid must be conceived afresh every time so as to meet requirements. This means that the designer must approach each new problem with an open mind and must seek to solve it by analysing it objectively. The difficulties of the task are due to the enormous differences in the demands made on the designer by the various assignments he receives. A small newspaper advertisement does not present the difficulties of designing, say, a daily paper with 10 and more columns. a great variety of subjects, and an additional advertising section. Such a task calls not only for designing talent but also organizing ability since the many constantly changing items of information have to be arranged in a logical order and their priorities reflected in appropriate typography.`}
					className="leading-tight text-primaryBlue"
					styles={{
						opacity: { from: 0.1, to: 1 },
					}}
					falloff="linear"
					radius={80}
				/>
			</div>
		</div>
	);
}
```

## Source

### `components/ui/text-proximity.tsx`

```tsx
"use client";

import React, { CSSProperties, forwardRef, useRef } from "react";

import { useMousePositionRef } from "@/hooks/use-mouse-position";
import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useTransform,
} from "motion/react";

// Credit:
// https://www.fancycomponents.dev/docs/components/text/text-cursor-proximity

// Helper type that makes all properties of CSSProperties accept number | string
type CSSPropertiesWithValues = {
	[K in keyof CSSProperties]: string | number;
};

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
	from: CSSPropertiesWithValues[T];
	to: CSSPropertiesWithValues[T];
}

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
	label: string;
	styles: Partial<{
		[K in keyof CSSPropertiesWithValues]: StyleValue<K>;
	}>;
	containerRef: React.RefObject<HTMLDivElement>;
	radius?: number;
	falloff?: "linear" | "exponential" | "gaussian";
}

const TextCursorProximity = forwardRef<HTMLSpanElement, TextProps>(
	(
		{
			label,
			styles,
			containerRef,
			radius = 50,
			falloff = "linear",
			className,
			onClick,
			...props
		},
		ref
	) => {
		const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
		const mousePositionRef = useMousePositionRef(containerRef);

		// Create a motion value for each letter's proximity
		const letterProximities = useRef(
			Array(label.replace(/\s/g, "").length)
				.fill(0)
				.map(() => useMotionValue(0))
		);

		const calculateDistance = (
			x1: number,
			y1: number,
			x2: number,
			y2: number
		): number => {
			return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
		};

		const calculateFalloff = (distance: number): number => {
			const normalizedDistance = Math.min(
				Math.max(1 - distance / radius, 0),
				1
			);

			switch (falloff) {
				case "exponential":
					return Math.pow(normalizedDistance, 2);
				case "gaussian":
					return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2);
				case "linear":
				default:
					return normalizedDistance;
			}
		};

		useAnimationFrame(() => {
			if (!containerRef?.current) return;
			const containerRect = containerRef.current.getBoundingClientRect();

			letterRefs.current.forEach((letterRef, index) => {
				if (!letterRef) return;

				const rect = letterRef.getBoundingClientRect();
				const letterCenterX =
					rect.left + rect.width / 2 - containerRect.left;
				const letterCenterY =
					rect.top + rect.height / 2 - containerRect.top;

				const distance = calculateDistance(
					mousePositionRef.current.x,
					mousePositionRef.current.y,
					letterCenterX,
					letterCenterY
				);

				const proximity = calculateFalloff(distance);
				letterProximities.current[index].set(proximity);
			});
		});

		const words = label.split(" ");
		let letterIndex = 0;

		return (
			<span
				ref={ref}
				className={`${className} inline`}
				onClick={onClick}
				{...props}
			>
				{words.map((word, wordIndex) => (
					<span key={wordIndex} className="inline-block whitespace-nowrap">
						{word.split("").map((letter) => {
							const currentLetterIndex = letterIndex++;
							const proximity =
								letterProximities.current[currentLetterIndex];

							// Create transformed values for each style property
							const transformedStyles = Object.entries(styles).reduce(
								(acc, [key, value]) => {
									acc[key] = useTransform(
										proximity,
										[0, 1],
										[value.from, value.to]
									);
									return acc;
								},
								{} as Record<string, any>
							);

							return (
								<motion.span
									key={currentLetterIndex}
									ref={(el: HTMLSpanElement | null) => {
										letterRefs.current[currentLetterIndex] = el;
									}}
									className="inline-block"
									aria-hidden="true"
									style={transformedStyles}
								>
									{letter}
								</motion.span>
							);
						})}
						{wordIndex < words.length - 1 && (
							<span className="inline-block">&nbsp;</span>
						)}
					</span>
				))}
				<span className="sr-only">{label}</span>
			</span>
		);
	}
);

TextCursorProximity.displayName = "TextCursorProximity";
export default TextCursorProximity;
```

### `hooks/use-mouse-position.ts`

```tsx
import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
	containerRef?: RefObject<HTMLElement | SVGElement>
) => {
	const positionRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const updatePosition = (x: number, y: number) => {
			if (containerRef && containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const relativeX = x - rect.left;
				const relativeY = y - rect.top;

				// Calculate relative position even when outside the container
				positionRef.current = { x: relativeX, y: relativeY };
			} else {
				positionRef.current = { x, y };
			}
		};

		const handleMouseMove = (ev: MouseEvent) => {
			updatePosition(ev.clientX, ev.clientY);
		};

		const handleTouchMove = (ev: TouchEvent) => {
			const touch = ev.touches[0];
			updatePosition(touch.clientX, touch.clientY);
		};

		// Listen for both mouse and touch events
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("touchmove", handleTouchMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, [containerRef]);


	return positionRef;
};
```

## Attribution

Source: Fancy Components · Original: https://www.fancycomponents.dev/docs/components/text/text-cursor-proximity

Adapted from the original. Credit the original author when you ship this.
