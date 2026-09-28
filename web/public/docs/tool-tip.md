# Tool Tip

- Categories: Utilities
- Tags: spring, hover, cursor-tracking
- Import: `@/components/ui/tool-tip`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/animated-tooltip

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/tool-tip.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` *(required)* | `{ id: number; firstName: string; jobTitle: string; image:…` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { AnimatedTooltip } from "./component";

export const people = [
	{
		id: 1,
		name: "John Doe",
		designation: "Software Engineer",
		image: "/itjustworks.jpg",
	},
	{
		id: 2,
		name: "Robert Johnson",
		designation: "Product Manager",
		image: "/itjustworks.jpg",
	},
	{
		id: 3,
		name: "Jane Smith",
		designation: "Data Scientist",
		image: "/itjustworks.jpg",
	},
	{
		id: 4,
		name: "Emily Davis",
		designation: "UX Designer",
		image: "/itjustworks.jpg",
	},
	{
		id: 5,
		name: "Tyler Durden",
		designation: "Soap Developer",
		image: "/itjustworks.jpg",
	},
	{
		id: 6,
		name: "Dora",
		designation: "The Explorer",
		image: "/itjustworks.jpg",
	},
];

export default function TooltipUsage() {
	return (
		<div className="flex flex-row items-center justify-center mb-10 w-full">
			<AnimatedTooltip items={people} />
		</div>
	);
}
```

## Source

### `components/ui/tool-tip.tsx`

```tsx
"use client";

import React, { useState } from "react";

import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from "motion/react";

// https://ui.aceternity.com/components/animated-tooltip

export const AnimatedTooltip = ({
	items,
}: {
	items: {
		id: number;
		firstName: string;
		jobTitle: string;
		image: [{ url: string }];
	}[];
}) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const springConfig = { stiffness: 100, damping: 5 };
	const x = useMotionValue(0); // going to set this value on mouse move
	// rotate the tooltip
	const rotate = useSpring(
		useTransform(x, [-100, 100], [-45, 45]),
		springConfig
	);
	// translate the tooltip
	const translateX = useSpring(
		useTransform(x, [-100, 100], [-50, 50]),
		springConfig
	);
	const handleMouseMove = (event: any) => {
		const halfWidth = event.target.offsetWidth / 2;
		x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
	};

	return (
		<>
			{items.map((item, idx) => (
				<div
					className="-mr-4  relative group basis-1/4"
					key={idx + "tooltip"}
					onMouseEnter={() => setHoveredIndex(item.id)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					{hoveredIndex === item.id && (
						<motion.div
							initial={{ opacity: 0, y: 20, scale: 0.6 }}
							animate={{
								opacity: 1,
								y: 0,
								scale: 1,
								transition: {
									type: "spring",
									stiffness: 260,
									damping: 10,
								},
							}}
							exit={{ opacity: 0, y: 20, scale: 0.6 }}
							style={{
								translateX: translateX,
								rotate: rotate,
								whiteSpace: "nowrap",
							}}
							className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-background z-40 shadow-xl px-4 py-2"
						>
							<div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-linear-to-r from-transparent via-emerald-500 to-transparent h-px " />
							<div className="absolute left-10 w-[40%] z-30 -bottom-px bg-linear-to-r from-transparent via-sky-500 to-transparent h-px " />
							<div className="font-bold text-foreground relative z-30 text-base">
								{item.firstName}
							</div>
							<div className="text-foreground text-xs">{item.jobTitle}</div>
						</motion.div>
					)}
					{!!item.image.length && (
						<img
							onMouseMove={handleMouseMove}
							height={100}
							width={100}
							src={item.image?.[0].url}
							alt={item.firstName}
							className="object-cover m-0! p-0! object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
						/>
					)}
				</div>
			))}
		</>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/animated-tooltip

Adapted from the original. Credit the original author when you ship this.
