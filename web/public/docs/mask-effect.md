# Mask Effect

- Categories: Images, Cursor & Pointer Effects
- Tags: hover, cursor-tracking
- Import: `@/components/ui/mask-effect`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/mask-effect.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `revealText` | `React.ReactNode` | — | — |
| `size` | `number` | `10` | — |
| `revealSize` | `number` | `600` | — |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { MaskContainer } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<MaskContainer revealText="it just works">
				<div>Some content</div>
			</MaskContainer>
		</div>
	);
}
```

## Source

### `components/ui/mask-effect.tsx`

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const MaskContainer = ({
	children,
	revealText,
	size = 10,
	revealSize = 600,
	className,
}: {
	children?: string | React.ReactNode;
	revealText?: string | React.ReactNode;
	size?: number;
	revealSize?: number;
	className?: string;
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [mousePosition, setMousePosition] = useState<any>({
		x: null,
		y: null,
	});
	const containerRef = useRef<any>(null);
	const updateMousePosition = (e: any) => {
		const rect = containerRef.current.getBoundingClientRect();
		setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	useEffect(() => {
		containerRef.current.addEventListener("mousemove", updateMousePosition);
		return () => {
			if (containerRef.current) {
				containerRef.current.removeEventListener(
					"mousemove",
					updateMousePosition
				);
			}
		};
	}, []);
	let maskSize = isHovered ? revealSize : size;

	return (
		<motion.div
			ref={containerRef}
			className={cn("h-screen relative", className)}
			animate={{
				backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
			}}
		>
			<motion.div
				className="w-full h-full flex items-center justify-center text-6xl absolute bg-background bg-grid-white/[0.2] text-foreground mask-[url(/mask.svg)] mask-size-[40px] mask-no-repeat"
				animate={{
					WebkitMaskPosition: `${mousePosition.x - maskSize / 2}px ${
						mousePosition.y - maskSize / 2
					}px`,
					WebkitMaskSize: `${maskSize}px`,
				}}
				transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
			>
				<div className="absolute inset-0 bg-background h-full w-full z-0 opacity-50" />
				<div
					onMouseEnter={() => {
						setIsHovered(true);
					}}
					onMouseLeave={() => {
						setIsHovered(false);
					}}
					className="max-w-4xl mx-auto text-center text-foreground  text-4xl font-bold relative z-20"
				>
					{children}
				</div>
			</motion.div>

			<div className="w-full h-full flex items-center justify-center  text-foreground">
				{revealText}
			</div>
		</motion.div>
	);
};
```
