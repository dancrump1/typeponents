# Cursor Follow

- Categories: Cursor & Pointer Effects
- Tags: spring, hover, cursor-tracking
- Import: `@/components/ui/cursor-follow`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/cursor-follow.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `""` | — |

## Usage

```tsx
"use client";

import React from "react";

import CursorFollow from "./component";

const images = [
	{
		src: "/itjustworks.jpg",
		label: "A beautiful forest probando el largo limite del texto",
	},
	{
		src: "/itjustworks.jpg",
		label: "Mountain at sunset",
	},
];

const CursorFollowDemo = () => {
	return (
		<CursorFollow>
			<div className="flex flex-row items-center justify-center gap-8 py-8">
				{images.map((img, i) => (
					<div key={i} className="flex flex-col items-center">
						<img
							src={img.src}
							alt={img.label}
							data-cursor-text={img.label}
							className="border-background h-48 w-48 rounded-xl object-cover transition-transform duration-200 hover:scale-105"
							style={{ cursor: "none" }}
						/>
					</div>
				))}
			</div>
		</CursorFollow>
	);
};

export default CursorFollowDemo;
```

## Source

### `components/ui/cursor-follow.tsx`

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

import { motion, useMotionValue, useSpring } from "motion/react";

export function useCursorPosition() {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setPosition({ x: event.clientX, y: event.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return position;
}

interface CursorFollowProps {
	children: React.ReactNode;
	className?: string;
}

const CIRCLE_SIZE = 16;

const CursorFollow: React.FC<CursorFollowProps> = ({
	children,
	className = "",
}) => {
	const { x: mouseX, y: mouseY } = useCursorPosition();
	const [cursorText, setCursorText] = useState<string | null>(null);
	const [pendingText, setPendingText] = useState<string | null>(null);
	const [textWidth, setTextWidth] = useState<number>(0);
	const measureRef = useRef<HTMLSpanElement>(null);

	// Motion values for smooth follow
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springX = useSpring(x, { stiffness: 350, damping: 40 });
	const springY = useSpring(y, { stiffness: 350, damping: 40 });

	// Calculate bubble width and height
	const bubbleWidth = cursorText ? Math.max(textWidth + 32, 40) : CIRCLE_SIZE;
	const bubbleHeight = cursorText ? 40 : CIRCLE_SIZE;

	// Update target position on mouse move
	useEffect(() => {
		x.set(mouseX - bubbleWidth / 2);
		y.set(mouseY - bubbleHeight / 2);
	}, [mouseX, mouseY, bubbleWidth, bubbleHeight, x, y]);

	// Pre-measure text width before showing bubble
	useEffect(() => {
		if (pendingText && measureRef.current) {
			const width = measureRef.current.offsetWidth;
			setTextWidth(width);
			setCursorText(pendingText);
			setPendingText(null);
		}
		if (!pendingText && !cursorText) {
			setTextWidth(0);
		}
	}, [pendingText, cursorText]);

	// Handlers for child hover
	const handleMouseOver = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		const text = target.getAttribute("data-cursor-text");
		if (text) {
			setPendingText(text);
		}
	};
	const handleMouseOut = () => {
		setCursorText(null);
		setPendingText(null);
	};

	return (
		<div
			className={`relative h-full w-full ${className}`}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			{children}
			<motion.div
				initial={{ opacity: 0, scale: 0.7 }}
				animate={{
					opacity: 1,
					scale: 1,
					top: !!cursorText ? "-30px" : 0,
					transition: { duration: 0.32, ease: "easeInOut" },
				}}
				exit={{ opacity: 0, scale: 0.7 }}
				className="pointer-events-none fixed z-50"
				style={{
					left: 0,
					top: 0,
					x: springX,
					y: springY,
				}}
			>
				<motion.div
					layout
					transition={{ duration: 0.32, ease: "easeInOut" }}
					animate={
						cursorText
							? {
									width: bubbleWidth,
									height: 40,
									borderRadius: 20,
									background: "var(--color-brand, #6366f1)",
									color: "#fff",
									paddingLeft: 16,
									paddingRight: 16,
									minWidth: 40,
									minHeight: 32,
									scale: 1.1,
								}
							: {
									width: CIRCLE_SIZE,
									height: CIRCLE_SIZE,
									borderRadius: 999,
									background: "var(--color-brand, #6366f1)",
									color: "#fff",
									paddingLeft: 0,
									paddingRight: 0,
									minWidth: CIRCLE_SIZE,
									minHeight: CIRCLE_SIZE,
									scale: 1,
								}
					}
					className="flex items-center justify-center text-xs font-medium shadow-lg"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						position: "relative",
						zIndex: 1,
						boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
					}}
				>
					{cursorText && (
						<motion.span
							initial={{ opacity: 0, filter: "blur(8px)" }}
							animate={{ opacity: 1, filter: "blur(0px)" }}
							exit={{ opacity: 0, filter: "blur(8px)" }}
							transition={{
								duration: 0.28,
								delay: 0.1,
								ease: "easeInOut",
							}}
							style={{
								whiteSpace: "nowrap",
								width: "100%",
								textAlign: "center",
								color: "#fff",
							}}
						>
							{cursorText}
						</motion.span>
					)}
				</motion.div>
				{/* Hidden span for pre-measuring text width */}
				{(pendingText || cursorText) && (
					<span
						ref={measureRef}
						style={{
							position: "absolute",
							visibility: "hidden",
							pointerEvents: "none",
							whiteSpace: "nowrap",
							fontSize: "0.75rem",
							fontWeight: 500,
							paddingLeft: 16,
							paddingRight: 16,
							fontFamily: "inherit",
						}}
					>
						{pendingText || cursorText}
					</span>
				)}
			</motion.div>
		</div>
	);
};

export default CursorFollow;
```
