# Spotlight

- Categories: Special Effects & FX
- Tags: spring, cursor-tracking
- Import: `@/components/ui/spotlight`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/spotlight.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |
| `size` | `number` | `200` | — |
| `springOptions` | `SpringOptions` | `{ bounce: 0 }` | — |

## Usage

```tsx
"use client";

import React from "react";

import { Spotlight } from "./component";
import { cn } from "@/lib/utils";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="relative flex h-160 w-full overflow-hidden rounded-md bg-background/96 antialiased md:items-center md:justify-center">
				<div
					className={cn(
						"pointer-events-none absolute inset-0 bg-size-[40px_40px] select-none",
						"bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
					)}
				/>

				<Spotlight
					className="-top-40 left-0 md:-top-20 md:left-60"
					fill="white"
				/>
				<div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
					<h1 className="bg-opacity-50 bg-linear-to-b from-background to-background bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
						Spotlight <br /> is the new trend.
					</h1>
					<p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-secondary">
						Spotlight effect is a great way to draw attention to a
						specific part of the page. Here, we are drawing the attention
						towards the text section of the page. I don&apos;t know why
						but I&apos;m running out of copy.
					</p>
				</div>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/spotlight.tsx`

```tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { motion, SpringOptions, useSpring, useTransform } from "motion/react";

export type SpotlightProps = {
	className?: string;
	size?: number;
	springOptions?: SpringOptions;
};

export function Spotlight({
	className,
	size = 200,
	springOptions = { bounce: 0 },
}: SpotlightProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

	const mouseX = useSpring(0, springOptions);
	const mouseY = useSpring(0, springOptions);

	const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
	const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

	useEffect(() => {
		if (containerRef.current) {
			const parent = containerRef.current.parentElement;
			if (parent) {
				parent.style.position = "relative";
				parent.style.overflow = "hidden";
				setParentElement(parent);
			}
		}
	}, []);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!parentElement) return;
			const { left, top } = parentElement.getBoundingClientRect();
			mouseX.set(event.clientX - left);
			mouseY.set(event.clientY - top);
		},
		[mouseX, mouseY, parentElement]
	);

	useEffect(() => {
		if (!parentElement) return;

		const abortController = new AbortController();

		parentElement.addEventListener("mousemove", handleMouseMove, {
			signal: abortController.signal,
		});
		parentElement.addEventListener("mouseenter", () => setIsHovered(true), {
			signal: abortController.signal,
		});
		parentElement.addEventListener("mouseleave", () => setIsHovered(false), {
			signal: abortController.signal,
		});

		return () => {
			abortController.abort();
		};
	}, [parentElement, handleMouseMove]);

	return (
		<motion.div
			ref={containerRef}
			className={cn(
				"pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200",
				"from-background via-background to-background",
				isHovered ? "opacity-100" : "opacity-0",
				className
			)}
			style={{
				width: size,
				height: size,
				left: spotlightLeft,
				top: spotlightTop,
			}}
		/>
	);
}
```
