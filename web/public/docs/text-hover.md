# Text Hover

Large outlined headline that only shows its rainbow gradient inside a soft circle around the pointer.

**Interaction.** The word sits invisible until you move onto it, then a round spotlight follows the pointer and paints the letter outlines it passes over in yellow, red, blue, cyan and violet; the colour fades again as the pointer moves on.

- Categories: Text
- Tags: hover, cursor-tracking
- Import: `@/components/ui/text-hover`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-hover.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` *(required)* | `string` | — | — |
| `duration` | `number` | — | — |
| `automatic` | `boolean` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { TextHoverEffect } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<TextHoverEffect text={"Components"} />
		</div>
	);
}
```

## Source

### `components/ui/text-hover.tsx`

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

import { motion } from "motion/react";

export const TextHoverEffect = ({
	text,
	duration,
}: {
	text: string;
	duration?: number;
	automatic?: boolean;
}) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const [cursor, setCursor] = useState({ x: 0, y: 0 });
	const [hovered, setHovered] = useState(false);
	const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

	useEffect(() => {
		if (svgRef.current && cursor.x !== null && cursor.y !== null) {
			const svgRect = svgRef.current.getBoundingClientRect();
			const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
			const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
			setMaskPosition({
				cx: `${cxPercentage}%`,
				cy: `${cyPercentage}%`,
			});
		}
	}, [cursor]);

	return (
		<section className="group relative h-full">
			<span className="absolute inset-0 transition-all justify-self-center content-center opacity-100 group-hover:opacity-0 pointer-events-none">
				Hover here to see the effect
			</span>
			<svg
				ref={svgRef}
				width="100%"
				height="100%"
				viewBox="0 0 300 100"
				xmlns="http://www.w3.org/2000/svg"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
				className="select-none z-0"
			>
				<defs>
					<linearGradient
						id="textGradient"
						gradientUnits="userSpaceOnUse"
						cx="50%"
						cy="50%"
						r="25%"
					>
						{hovered && (
							<>
								<stop offset="0%" stopColor={"var(--yellow-500)"} />
								<stop offset="25%" stopColor={"var(--red-500)"} />
								<stop offset="50%" stopColor={"var(--blue-500)"} />
								<stop offset="75%" stopColor={"var(--cyan-500)"} />
								<stop offset="100%" stopColor={"var(--violet-500)"} />
							</>
						)}
					</linearGradient>

					<motion.radialGradient
						id="revealMask"
						gradientUnits="userSpaceOnUse"
						r="20%"
						animate={maskPosition}
						transition={{ duration: duration ?? 0, ease: "easeOut" }}
					>
						<stop offset="0%" stopColor="white" />
						<stop offset="100%" stopColor="black" />
					</motion.radialGradient>
					<mask id="textMask">
						<rect
							x="0"
							y="0"
							width="100%"
							height="100%"
							fill="url(#revealMask)"
						/>
					</mask>
				</defs>
				<text
					x="50%"
					y="50%"
					textAnchor="middle"
					dominantBaseline="middle"
					stroke="url(#textGradient)"
					strokeWidth="0.3"
					mask="url(#textMask)"
					className="font-[helvetica] font-bold fill-transparent text-4xl pointer-events-none"
				>
					{text}
				</text>
			</svg>
		</section>
	);
};
```
