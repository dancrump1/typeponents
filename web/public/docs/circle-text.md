# Circle Text

- Categories: Text
- Tags: spring, hover
- Import: `@/components/ui/circle-text`
- Inspiration: React Bits (adaptation) — https://www.reactbits.dev/text-animations/circular-text

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/circle-text.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` *(required)* | `string` | — | — |
| `spinDuration` | `number` | `20` | — |
| `onHover` | `"slowDown" | "speedUp" | "pause" | "goBonkers"` | `"speedUp"` | — |
| `className` | `string` | `""` | — |

## Usage

```tsx
"use client";

import React from "react";

import CircularText from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CircularText
				text="TECH*CHUNKS*COMPONENTS*"
				onHover="speedUp"
				spinDuration={20}
			/>
		</div>
	);
}
```

## Source

### `components/ui/circle-text.tsx`

```tsx
import React, { useEffect, useState } from "react";

import { motion, useAnimation } from "motion/react";

// Credit:
// https://www.reactbits.dev/text-animations/circular-text

interface CircularTextProps {
	text: string;
	spinDuration?: number;
	onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
	className?: string;
}

const getRotationTransition = (
	duration: number,
	from: number,
	loop: boolean = true
) => ({
	from: from,
	to: from + 360,
	ease: "linear",
	duration: duration,
	type: "tween",
	repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
	rotate: getRotationTransition(duration, from),
	scale: {
		type: "spring",
		damping: 20,
		stiffness: 300,
	},
});

const CircularText: React.FC<CircularTextProps> = ({
	text,
	spinDuration = 20,
	onHover = "speedUp",
	className = "",
}) => {
	const letters = Array.from(text);
	const controls = useAnimation();
	const [currentRotation, setCurrentRotation] = useState(0);

	useEffect(() => {
		controls.start({
			rotate: currentRotation + 360,
			scale: 1,
			transition: getTransition(spinDuration, currentRotation),
		});
	}, [spinDuration, controls, onHover, text]);

	const handleHoverStart = () => {
		if (!onHover) return;
		switch (onHover) {
			case "slowDown":
				controls.start({
					rotate: currentRotation + 360,
					scale: 1,
					transition: getTransition(spinDuration * 2, currentRotation),
				});
				break;
			case "speedUp":
				controls.start({
					rotate: currentRotation + 360,
					scale: 1,
					transition: getTransition(spinDuration / 4, currentRotation),
				});
				break;
			case "pause":
				controls.start({
					rotate: currentRotation,
					scale: 1,
					transition: {
						rotate: { type: "spring", damping: 20, stiffness: 300 },
						scale: { type: "spring", damping: 20, stiffness: 300 },
					},
				});
				break;
			case "goBonkers":
				controls.start({
					rotate: currentRotation + 360,
					scale: 0.8,
					transition: getTransition(spinDuration / 20, currentRotation),
				});
				break;
			default:
				break;
		}
	};

	const handleHoverEnd = () => {
		controls.start({
			rotate: currentRotation + 360,
			scale: 1,
			transition: getTransition(spinDuration, currentRotation),
		});
	};

	return (
		<motion.div
			initial={{ rotate: 0 }}
			className={`mx-auto rounded-full w-[200px] h-[200px] text-foreground font-black text-center cursor-pointer ${className}`}
			animate={controls}
			onUpdate={(latest) => setCurrentRotation(Number(latest.rotate))}
			onMouseEnter={handleHoverStart}
			onMouseLeave={handleHoverEnd}
		>
			{letters.map((letter, i) => {
				const rotation = (360 / letters.length) * i;
				const factor = Number((Math.PI / letters.length).toFixed(0));
				const x = factor * i;
				const y = factor * i;
				const transform = `rotateZ(${rotation}deg) translate3d(${x}px, ${y}px, 0)`;

				return (
					<span
						key={i + "circle-text"}
						className="absolute inline-block inset-0 text-2xl transition-translate duration-500 ease-[cubic-bezier(0,0,0,1)]"
						style={{ transform, WebkitTransform: transform }}
					>
						{letter}
					</span>
				);
			})}
		</motion.div>
	);
};

export default CircularText;
```

## Attribution

Source: React Bits · Original: https://www.reactbits.dev/text-animations/circular-text

Adapted from the original. Credit the original author when you ship this.
