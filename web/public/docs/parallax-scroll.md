# Parallax Scroll

- Categories: Media Galleries
- Tags: scroll-driven
- Import: `@/components/ui/parallax-scroll`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/parallax-scroll

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/parallax-scroll.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `images` *(required)* | `string[]` | — | — |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { ParallaxScroll } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ParallaxScroll
				images={[
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
				]}
			/>
		</div>
	);
}
```

## Source

### `components/ui/parallax-scroll.tsx`

```tsx
"use client";

import React, { useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";

// https://ui.aceternity.com/components/parallax-scroll
export const ParallaxScroll = ({
	images,
	className,
}: {
	images: string[];
	className?: string;
}) => {
	const gridRef = useRef<any>(null);
	const { scrollYProgress } = useScroll({
		container: gridRef, // remove this if your container is not fixed height
		offset: ["start start", "end start"], // remove this if your container is not fixed height
	});

	const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
	const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

	const third = Math.ceil(images?.length / 3);

	const firstPart = images?.slice(0, third);
	const secondPart = images?.slice(third, 2 * third);
	const thirdPart = images?.slice(2 * third);

	return (
		<div
			className={cn(
				"h-160 items-start overflow-y-auto w-full",
				className
			)}
			ref={gridRef}
		>
			<div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-5xl mx-auto gap-10 py-40 px-10"
				ref={gridRef}
			>
				<div className="grid gap-10">
					{firstPart.map((el, idx) => (
						<motion.div
							style={{ y: translateFirst }} // Apply the translateY motion value here
							key={"grid-1" + idx}
						>
							<img
								src={el}
								className="h-80 w-full object-cover object-top-left rounded-lg gap-10 m-0! p-0!"
								height="400"
								width="400"
								alt="thumbnail"
							/>
						</motion.div>
					))}
				</div>
				<div className="grid gap-10">
					{secondPart.map((el, idx) => (
						<motion.div
							style={{ y: translateSecond }}
							key={"grid-2" + idx}
						>
							<img
								src={el}
								className="h-80 w-full object-cover object-top-left rounded-lg gap-10 m-0! p-0!"
								height="400"
								width="400"
								alt="thumbnail"
							/>
						</motion.div>
					))}
				</div>
				<div className="grid gap-10">
					{thirdPart.map((el, idx) => (
						<motion.div
							style={{ y: translateThird }}
							key={"grid-3" + idx}
						>
							<img
								src={el}
								className="h-80 w-full object-cover object-top-left rounded-lg gap-10 m-0! p-0!"
								height="400"
								width="400"
								alt="thumbnail"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/parallax-scroll

Adapted from the original. Credit the original author when you ship this.
