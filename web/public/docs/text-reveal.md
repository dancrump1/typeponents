# Text Reveal

- Categories: Text, Text Animations
- Tags: hover, cursor-tracking
- Import: `@/components/ui/text-reveal`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/text-reveal-card

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-reveal.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `tailwind-merge`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` *(required)* | `string` | — | — |
| `revealText` *(required)* | `string` | — | — |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import {
	TextRevealCard,
	TextRevealCardDescription,
	TextRevealCardTitle,
} from "./component";

export default function TextRevealCardPreview() {
	return (
		<div className="flex items-center justify-center bg-background h-160 rounded-2xl w-full">
			<TextRevealCard
				text="You know the business"
				revealText="I know the chemistry "
			>
				<TextRevealCardTitle>
					Sometimes, you just need to see it.
				</TextRevealCardTitle>
				<TextRevealCardDescription>
					This is a text reveal card. Hover over the card to reveal the
					hidden text.
				</TextRevealCardDescription>
			</TextRevealCard>
		</div>
	);
}
```

## Source

### `components/ui/text-reveal.tsx`

```tsx
"use client";

import React, { memo, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

// https://ui.aceternity.com/components/text-reveal-card

export const TextRevealCard = ({
	text,
	revealText,
	children,
	className,
}: {
	text: string;
	revealText: string;
	children?: React.ReactNode;
	className?: string;
}) => {
	const [widthPercentage, setWidthPercentage] = useState(0);
	const cardRef = useRef<HTMLDivElement | any>(null);
	const [left, setLeft] = useState(0);
	const [localWidth, setLocalWidth] = useState(0);
	const [isMouseOver, setIsMouseOver] = useState(false);

	useEffect(() => {
		if (cardRef.current) {
			const { left, width: localWidth } =
				cardRef.current.getBoundingClientRect();
			setLeft(left);
			setLocalWidth(localWidth);
		}
	}, []);

	function mouseMoveHandler(event: any) {
		event.preventDefault();

		const { clientX } = event;
		if (cardRef.current) {
			const relativeX = clientX - left;
			setWidthPercentage((relativeX / localWidth) * 100);
		}
	}

	function mouseLeaveHandler() {
		setIsMouseOver(false);
		setWidthPercentage(0);
	}
	function mouseEnterHandler() {
		setIsMouseOver(true);
	}

	const rotateDeg = (widthPercentage - 50) * 0.1;
	return (
		<div
			onMouseEnter={mouseEnterHandler}
			onMouseLeave={mouseLeaveHandler}
			onMouseMove={mouseMoveHandler}
			ref={cardRef}
			className={cn(
				"bg-background border border-white/8 w-160 rounded-lg p-8 relative overflow-hidden",
				className
			)}
		>
			{children}

			<div className="h-40  relative flex items-center overflow-hidden">
				<motion.div
					style={{
						width: "100%",
					}}
					animate={
						isMouseOver
							? {
									opacity: widthPercentage > 0 ? 1 : 0,
									clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
								}
							: {
									clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
								}
					}
					transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
					className="absolute bg-background z-20  will-change-transform"
				>
					<p
						style={{
							textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
						}}
						className="text-base sm:text-[3rem] py-10 font-bold text-foreground bg-clip-text text-transparent bg-linear-to-b from-background to-background"
					>
						{revealText}
					</p>
				</motion.div>
				<motion.div
					animate={{
						left: `${widthPercentage}%`,
						rotate: `${rotateDeg}deg`,
						opacity: widthPercentage > 0 ? 1 : 0,
					}}
					transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
					className="h-40 w-[8px] bg-linear-to-b from-transparent via-background to-transparent absolute z-40 will-change-transform"
				></motion.div>

				<div className=" overflow-hidden mask-[linear-gradient(to_bottom,transparent,white,transparent)]">
					<p className="text-base sm:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-background">
						{text}
					</p>
				</div>
			</div>
		</div>
	);
};

export const TextRevealCardTitle = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<h2 className={twMerge("text-foreground text-lg mb-2", className)}>
			{children}
		</h2>
	);
};

export const TextRevealCardDescription = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<p className={twMerge("text-foreground text-sm", className)}>{children}</p>
	);
};

const Stars = () => {
	const randomMove = () => Math.random() * 4 - 2;
	const randomOpacity = () => Math.random();
	const random = () => Math.random();
	return (
		<div className="absolute inset-0">
			{[...Array(140)].map((_, i) => (
				<motion.span
					key={`star-${i}`}
					animate={{
						top: `calc(${random() * 100}% + ${randomMove()}px)`,
						left: `calc(${random() * 100}% + ${randomMove()}px)`,
						opacity: randomOpacity(),
						scale: [1, 1.2, 0],
					}}
					transition={{
						duration: random() * 10 + 20,
						repeat: Infinity,
						ease: "linear",
					}}
					style={{
						position: "absolute",
						top: `${random() * 100}%`,
						left: `${random() * 100}%`,
						width: `2px`,
						height: `2px`,
						backgroundColor: "white",
						borderRadius: "50%",
						zIndex: 1,
					}}
					className="inline-block"
				></motion.span>
			))}
		</div>
	);
};

export const MemoizedStars = memo(Stars);
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/text-reveal-card

Adapted from the original. Credit the original author when you ship this.
