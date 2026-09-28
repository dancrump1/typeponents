# Cursor Mask

- Categories: Cursor & Pointer Effects
- Tags: cursor-tracking, autoplay
- Import: `@/components/ui/cursor-mask`
- Inspiration: auraui.vercel.app (adaptation) — https://auraui.vercel.app/component/mask-cursor

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/cursor-mask.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `tailwind-merge`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `hoverColor` | `string` | — | — |
| `maskColor` | `string` | `"#A5FECB"` | — |
| `className` | `string` | — | — |
| `hovered` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import MaskCursor from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<MaskCursor />
		</div>
	);
}
```

## Source

### `components/ui/cursor-mask.tsx`

```tsx
"use client";

import type React from "react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { useHover } from "@/lib/hover-context";
import { useMousePosition } from "@/lib/elastic-line-position";
import { motion, useMotionValue, useTransform } from "motion/react";
import { twMerge } from "tailwind-merge";

// Credit:
// https://auraui.vercel.app/component/mask-cursor

interface MaskCursorProps {
	children: ReactNode;
	hoverColor?: string;
	maskColor?: string;
	className?: string;
	hovered?: string;
}
const MaskCursor: React.FC<MaskCursorProps> = ({
	children,
	className,
	hoverColor,
	maskColor = "#A5FECB",
	hovered,
}) => {
	const { x, y } = useMousePosition();

	const { hovering } = useHover();

	const [svgSize, setSvgSize] = useState(500);

	// Reference to the container to calculate offsets
	const containerRef = useRef<HTMLDivElement>(null);

	const [recentHover, setRecentHover] = useState(false);

	useEffect(() => {
		setRecentHover(true);
		setSvgSize(hovering ? 5000 : 500);
		setTimeout(() => {
			setRecentHover(false);
		}, 300);
	}, [hovering]);

	// keep track of the cursor center
	const [maskCenter, setMaskCenter] = useState({
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	});

	useEffect(() => {
		if (x + y !== 0) {
			setMaskCenter({ x, y }); // always track mouse center, independent of size
		}
	}, [x, y]);

	// useMotionValues for smooth animation
	const maskX = useMotionValue(maskCenter.x);
	const maskY = useMotionValue(maskCenter.y);

	// animate the motion values when maskCenter updates
	useEffect(() => {
		maskX.set(maskCenter.x);
		maskY.set(maskCenter.y);
	}, [maskCenter, maskX, maskY]);

	// If user scrolls, keep centered on mouse
	useEffect(() => {
		if (containerRef.current && x + y !== 0) {
			const rect = containerRef.current.getBoundingClientRect();
			// adjust mouse position relative to the container
			const localX = x - rect.left;
			const localY = y - rect.top;

			setMaskCenter({ x: localX, y: localY });
		}
	}, [x, y]);

	// Keep mask position just the raw mouse coords
	const smoothMaskX = useTransform(
		maskX,
		(value) => `${value - svgSize / 2}px`
	);
	const smoothMaskY = useTransform(
		maskY,
		(value) => `${value - svgSize / 2}px`
	);

	return (
		<div
			className={twMerge("relative p-10 h-full w-full", className)}
			ref={containerRef}
		>
			<motion.div
				className={twMerge(
					"absolute inset-0 text-4xl",
					`dark:bg-[${maskColor}] bg-gray-200`
				)}
				animate={{
					WebkitMaskSize: `${svgSize}px`,
					WebkitMaskPosition: `${smoothMaskX.get()} ${smoothMaskY.get()}`,
				}}
				transition={{
					WebkitMaskSize: {
						type: "tween",
						ease: "easeOut",
						duration: 0.3,
					},

					WebkitMaskPosition:
						!hovering && !recentHover
							? {
									duration: 0,
								}
							: {
									type: "tween",
									ease: "easeOut",
									duration: 0.3,
								},
				}}
				style={{
					WebkitMaskImage: "url('/black-circle.svg')",
					WebkitMaskRepeat: "no-repeat",
					color: hoverColor ? hoverColor : "green",
				}}
			>
				{(hovered === "About Us" || hovered === "about") && (
					<video
						src="placeholder.mp4"
						height={1920}
						width={1080}
						className="h-screen w-screen object-cover"
						muted
						autoPlay
						preload="auto"
						loop
					/>
				)}
				{hovered === "WATCH REEL" && (
					<video
						src="IMG_4377 2.MOV"
						autoPlay
						muted
						height={1920}
						width={1080}
						loop
						preload="auto"
						className="h-screen w-screen object-cover"
					/>
				)}
				{hovered === "OUR TEAM" && (
					<video
						src="placeholder.mp4"
						height={1920}
						width={1080}
						className="h-screen w-screen object-cover"
						muted
						autoPlay
						loop
					/>
				)}
				{hovered === "CONTACT" && (
					<video
						src="placeholder.mp4"
						height={1920}
						width={1080}
						className="h-screen w-screen object-cover opacity-25"
						autoPlay
						muted
						loop
					/>
				)}
			</motion.div>
			{children}
		</div>
	);
};

export default MaskCursor;
```

### `lib/elastic-line-position.ts`

```tsx
import { RefObject, useEffect, useState } from "react"

export const useMousePosition = (
    containerRef?: RefObject<HTMLElement | SVGElement>
) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const updatePosition = (x: number, y: number) => {
            if (containerRef && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const relativeX = x - rect.left
                const relativeY = y - rect.top

                // Calculate relative position even when outside the container
                setPosition({ x: relativeX, y: relativeY })
            } else {
                setPosition({ x, y })
            }
        }

        const handleMouseMove = (ev: MouseEvent) => {
            updatePosition(ev.clientX, ev.clientY)
        }

        const handleTouchMove = (ev: TouchEvent) => {
            const touch = ev.touches[0]
            updatePosition(touch.clientX, touch.clientY)
        }

        // Listen for both mouse and touch events
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("touchmove", handleTouchMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("touchmove", handleTouchMove)
        }
    }, [containerRef])

    return position
}
```

### `lib/hover-context.tsx`

```tsx
"use client";

import { createContext, useContext, useState } from "react";

type HoverContextType = {
	hovered: string | null;
	setHovered: (id: string | null) => void;
	hovering: boolean;
	setHovering: (value: boolean) => void;
};

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: React.ReactNode }) {
	const [hovered, setHovered] = useState<string | null>("about");
	const [hovering, setHovering] = useState<boolean>(false);

	return (
		<HoverContext.Provider
			value={{ hovered, setHovered, hovering, setHovering }}
		>
			{children}
		</HoverContext.Provider>
	);
}

export function useHover() {
	const ctx = useContext(HoverContext);
	if (!ctx) throw new Error("useHover must be used within HoverProvider");
	return ctx;
}
```

## Attribution

Source: auraui.vercel.app · Original: https://auraui.vercel.app/component/mask-cursor

Adapted from the original. Credit the original author when you ship this.
