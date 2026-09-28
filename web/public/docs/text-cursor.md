# Text Cursor

Pointer trail that drops a repeating character or emoji along the path of the cursor.

**Interaction.** Moving the pointer leaves a short line of characters behind it, each one tilted to follow the direction of travel and drifting gently in place; they fade away one by one once you stop moving.

- Categories: Text, Text Animations
- Tags: cursor-tracking, autoplay
- Import: `@/components/ui/text-cursor`
- Inspiration: React Bits (adaptation) — https://www.reactbits.dev/text-animations/text-cursor

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-cursor.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"⚛️"` | — |
| `delay` | `number` | `0.01` | — |
| `spacing` | `number` | `100` | — |
| `followMouseDirection` | `boolean` | `true` | — |
| `randomFloat` | `boolean` | `true` | — |
| `exitDuration` | `number` | `0.5` | — |
| `removalInterval` | `number` | `30` | — |
| `maxPoints` | `number` | `5` | — |

## Usage

```tsx
import TextCursor from "./component";

const TextCursorUsage = () => {
	return (
		<TextCursor
			text="Hello!"
			delay={0.01}
			spacing={80}
			followMouseDirection={true}
			randomFloat={true}
			exitDuration={0.3}
			removalInterval={20}
			maxPoints={10}
		/>
	);
};

export default TextCursorUsage;
```

## Source

### `components/ui/text-cursor.tsx`

```tsx
import React, { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

// Credit:
// https://www.reactbits.dev/text-animations/text-cursor

interface TextCursorProps {
	text: string;
	delay?: number;
	spacing?: number;
	followMouseDirection?: boolean;
	randomFloat?: boolean;
	exitDuration?: number;
	removalInterval?: number;
	maxPoints?: number;
}

interface TrailItem {
	id: number;
	x: number;
	y: number;
	angle: number;
	randomX?: number;
	randomY?: number;
	randomRotate?: number;
}

const TextCursor: React.FC<TextCursorProps> = ({
	text = "⚛️",
	delay = 0.01,
	spacing = 100,
	followMouseDirection = true,
	randomFloat = true,
	exitDuration = 0.5,
	removalInterval = 30,
	maxPoints = 5,
}) => {
	const [trail, setTrail] = useState<TrailItem[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const lastMoveTimeRef = useRef<number>(Date.now());
	const idCounter = useRef<number>(0);

	const handleMouseMove = (e: MouseEvent) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		setTrail((prev) => {
			let newTrail = [...prev];
			if (newTrail.length === 0) {
				newTrail.push({
					id: idCounter.current++,
					x: mouseX,
					y: mouseY,
					angle: 0,
					...(randomFloat && {
						randomX: Math.random() * 10 - 5,
						randomY: Math.random() * 10 - 5,
						randomRotate: Math.random() * 10 - 5,
					}),
				});
			} else {
				const last = newTrail[newTrail.length - 1];
				const dx = mouseX - last.x;
				const dy = mouseY - last.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				if (distance >= spacing) {
					let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
					if (rawAngle > 90) rawAngle -= 180;
					else if (rawAngle < -90) rawAngle += 180;
					const computedAngle = followMouseDirection ? rawAngle : 0;
					const steps = Math.floor(distance / spacing);
					for (let i = 1; i <= steps; i++) {
						const t = (spacing * i) / distance;
						const newX = last.x + dx * t;
						const newY = last.y + dy * t;
						newTrail.push({
							id: idCounter.current++,
							x: newX,
							y: newY,
							angle: computedAngle,
							...(randomFloat && {
								randomX: Math.random() * 10 - 5,
								randomY: Math.random() * 10 - 5,
								randomRotate: Math.random() * 10 - 5,
							}),
						});
					}
				}
			}
			if (newTrail.length > maxPoints) {
				newTrail = newTrail.slice(newTrail.length - maxPoints);
			}
			return newTrail;
		});
		lastMoveTimeRef.current = Date.now();
	};

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		container.addEventListener("mousemove", handleMouseMove);
		return () => container.removeEventListener("mousemove", handleMouseMove);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (Date.now() - lastMoveTimeRef.current > 100) {
				setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev));
			}
		}, removalInterval);
		return () => clearInterval(interval);
	}, [removalInterval]);

	return (
		<div ref={containerRef} className="w-full h-full relative">
			<div className="absolute inset-0 pointer-events-none">
				<AnimatePresence>
					{trail.map((item) => (
						<motion.div
							key={item.id}
							initial={{
								opacity: 0,
								scale: 1,
								x: 0,
								y: 0,
								rotate: item.angle,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								x: randomFloat ? [0, item.randomX || 0, 0] : 0,
								y: randomFloat ? [0, item.randomY || 0, 0] : 0,
								rotate: randomFloat
									? [
											item.angle,
											item.angle + (item.randomRotate || 0),
											item.angle,
										]
									: item.angle,
							}}
							exit={{ opacity: 0, scale: 0 }}
							transition={{
								opacity: {
									duration: exitDuration,
									ease: "easeOut",
									delay,
								},
								...(randomFloat && {
									x: {
										duration: 2,
										ease: "easeInOut",
										repeat: Infinity,
										repeatType: "mirror",
									},
									y: {
										duration: 2,
										ease: "easeInOut",
										repeat: Infinity,
										repeatType: "mirror",
									},
									rotate: {
										duration: 2,
										ease: "easeInOut",
										repeat: Infinity,
										repeatType: "mirror",
									},
								}),
							}}
							className="absolute select-none whitespace-nowrap text-3xl"
							style={{ left: item.x, top: item.y }}
						>
							{text}
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default TextCursor;
```

## Attribution

Source: React Bits · Original: https://www.reactbits.dev/text-animations/text-cursor

Adapted from the original. Credit the original author when you ship this.
