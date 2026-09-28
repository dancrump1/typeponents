# Text Focus

Blurred sentence with one word held sharp inside a glowing camera-style focus bracket.

**Interaction.** The focus bracket travels from word to word on its own, sharpening each word as it arrives and blurring the rest; in manual mode it follows whichever word you hover instead.

- Categories: Text
- Tags: hover, autoplay
- Import: `@/components/ui/text-focus`
- Inspiration: React Bits (adaptation) — https://www.reactbits.dev/text-animations/true-focus

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-focus.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `sentence` | `string` | `"True Focus"` | — |
| `manualMode` | `boolean` | `false` | — |
| `blurAmount` | `number` | `5` | — |
| `borderColor` | `string` | `"green"` | — |
| `glowColor` | `string` | `"rgba(0, 255, 0, 0.6)"` | — |
| `animationDuration` | `number` | `0.5` | — |
| `pauseBetweenAnimations` | `number` | `1` | — |

## Usage

```tsx
"use client";

import React from "react";

import TextFocus from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<TextFocus
				sentence="True Focus"
				manualMode={false}
				blurAmount={5}
				borderColor="red"
				animationDuration={2}
				pauseBetweenAnimations={1}
			/>{" "}
		</div>
	);
}
```

## Source

### `components/ui/text-focus.tsx`

```tsx
import { useEffect, useRef, useState } from "react";

import { motion } from "motion/react";

// Credit:
// https://www.reactbits.dev/text-animations/true-focus
interface TrueFocusProps {
	sentence?: string;
	manualMode?: boolean;
	blurAmount?: number;
	borderColor?: string;
	glowColor?: string;
	animationDuration?: number;
	pauseBetweenAnimations?: number;
}

interface FocusRect {
	x: number;
	y: number;
	width: number;
	height: number;
}

const TextFocus: React.FC<TrueFocusProps> = ({
	sentence = "True Focus",
	manualMode = false,
	blurAmount = 5,
	borderColor = "green",
	glowColor = "rgba(0, 255, 0, 0.6)",
	animationDuration = 0.5,
	pauseBetweenAnimations = 1,
}) => {
	const words = sentence.split(" ");
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const [focusRect, setFocusRect] = useState<FocusRect>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	useEffect(() => {
		if (!manualMode) {
			const interval = setInterval(
				() => {
					setCurrentIndex((prev) => (prev + 1) % words.length);
				},
				(animationDuration + pauseBetweenAnimations) * 1000
			);

			return () => clearInterval(interval);
		}
	}, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

	useEffect(() => {
		if (currentIndex === null || currentIndex === -1) return;
		if (!wordRefs.current[currentIndex] || !containerRef.current) return;

		const parentRect = containerRef.current.getBoundingClientRect();
		const activeRect =
			wordRefs.current[currentIndex]!.getBoundingClientRect();

		setFocusRect({
			x: activeRect.left - parentRect.left,
			y: activeRect.top - parentRect.top,
			width: activeRect.width,
			height: activeRect.height,
		});
	}, [currentIndex, words.length]);

	const handleMouseEnter = (index: number) => {
		if (manualMode) {
			setLastActiveIndex(index);
			setCurrentIndex(index);
		}
	};

	const handleMouseLeave = () => {
		if (manualMode) {
			setCurrentIndex(lastActiveIndex!);
		}
	};

	return (
		<div
			className="relative flex gap-4 justify-center items-center flex-wrap"
			ref={containerRef}
		>
			{words.map((word, index) => {
				const isActive = index === currentIndex;
				return (
					<span
						key={index + "text-focus"}
						ref={(el) => (wordRefs.current[index] = el)}
						className="relative text-[3rem] font-black cursor-pointer"
						style={
							{
								filter: manualMode
									? isActive
										? `blur(0px)`
										: `blur(${blurAmount}px)`
									: isActive
										? `blur(0px)`
										: `blur(${blurAmount}px)`,
								transition: `filter ${animationDuration}s ease`,
							} as React.CSSProperties
						}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={handleMouseLeave}
					>
						{word}
					</span>
				);
			})}

			<motion.div
				className="absolute top-0 left-0 pointer-events-none box-border border-0"
				animate={{
					x: focusRect.x,
					y: focusRect.y,
					width: focusRect.width,
					height: focusRect.height,
					opacity: currentIndex >= 0 ? 1 : 0,
				}}
				transition={{
					duration: animationDuration,
				}}
				style={
					{
						"--border-color": borderColor,
						"--glow-color": glowColor,
					} as React.CSSProperties
				}
			>
				<span
					className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
					style={{
						borderColor: "var(--border-color)",
						filter: "drop-shadow(0 0 4px var(--border-color))",
					}}
				></span>
				<span
					className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
					style={{
						borderColor: "var(--border-color)",
						filter: "drop-shadow(0 0 4px var(--border-color))",
					}}
				></span>
				<span
					className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
					style={{
						borderColor: "var(--border-color)",
						filter: "drop-shadow(0 0 4px var(--border-color))",
					}}
				></span>
				<span
					className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
					style={{
						borderColor: "var(--border-color)",
						filter: "drop-shadow(0 0 4px var(--border-color))",
					}}
				></span>
			</motion.div>
		</div>
	);
};

export default TextFocus;
```

## Attribution

Source: React Bits · Original: https://www.reactbits.dev/text-animations/true-focus

Adapted from the original. Credit the original author when you ship this.
