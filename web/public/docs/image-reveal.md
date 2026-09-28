# Image Reveal

- Categories: Images
- Tags: hover, cursor-tracking, autoplay, responsive
- Import: `@/components/ui/image-reveal`
- Inspiration: UI Layouts (adaptation) — https://www.ui-layouts.com/components/image-reveal

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/image-reveal.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `usehooks-ts`

## Usage

```tsx
"use client";

import React from "react";

import ImageReveal from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ImageReveal />
		</div>
	);
}
```

## Source

### `components/ui/image-reveal.tsx`

```tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import { MoveUpRight } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

// Credit:
// https://www.ui-layouts.com/components/image-reveal

interface ImageData {
	id: number;
	src: string;
	alt: string;
}

const images: ImageData[] = [
	{
		id: 1,
		src: "/itjustworks.jpg",
		alt: "Image Mousetrail",
	},
	{
		id: 2,
		src: "/itjustworks.jpg",
		alt: "Spotlight Cards",
	},
	{
		id: 3,
		src: "/itjustworks.jpg",
		alt: "Sparkles Effects",
	},
	{
		id: 4,
		src: "/itjustworks.jpg",
		alt: "Horizontal Scroll",
	},
];

const ImageReveal: React.FC = () => {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [activeImage, setActiveImage] = useState<ImageData | null>(null);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState(0);
	const [scale, setScale] = useState(0.5);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const requestRef = useRef<number | null>(null);
	const prevCursorPosition = useRef({ x: 0, y: 0 });

	const handleMouseMove = useCallback((e: MouseEvent) => {
		const { clientX, clientY } = e;
		const dx = clientX - prevCursorPosition.current.x;
		const dy = clientY - prevCursorPosition.current.y;

		// Apply easing to the cursor movement
		const easeAmount = 0.2;
		const newX = prevCursorPosition.current.x + dx * easeAmount;
		const newY = prevCursorPosition.current.y + dy * easeAmount;

		setCursorPosition({ x: newX, y: newY });
		prevCursorPosition.current = { x: newX, y: newY };
	}, []);

	useEffect(() => {
		const updateCursorPosition = (e: MouseEvent) => {
			if (requestRef.current) return;
			requestRef.current = requestAnimationFrame(() => {
				handleMouseMove(e);
				requestRef.current = null;
			});
		};

		window.addEventListener("mousemove", updateCursorPosition);
		return () => {
			window.removeEventListener("mousemove", updateCursorPosition);
			if (requestRef.current) cancelAnimationFrame(requestRef.current);
		};
	}, [handleMouseMove]);

	const handleImageHover = useCallback(
		(image: ImageData) => {
			if (activeImage !== image) {
				setActiveImage(image);
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					setOpacity(1);
					setScale(1);
				}, 50);
			} else {
				setOpacity(1);
				setScale(1);
			}
		},
		[activeImage]
	);

	const handleMouseLeave = useCallback(() => {
		setOpacity(0);
		setScale(0.5);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setActiveImage(null);
		}, 300);
	}, []);

	return (
		<div
			className="relative w-full min-h-fit dark:bg-linear-to-b from-background from-10% to-background to-100% bg-background rounded-md border"
			onMouseLeave={handleMouseLeave}
		>
			{images?.map((image, i) => (
				<div
					key={image.alt || i + "image-reveal"}
					className={`p-4 cursor-pointer relative sm:flex items-center justify-between`}
					onMouseEnter={() => handleImageHover(image)}
				>
					{!isDesktop && (
						<img
							src={image?.src}
							className="sm:w-32 sm:h-20 w-full h-52 object-cover rounded-md"
							alt="mobileImg"
						/>
					)}
					<h2
						className={`newFont dark:text-foreground uppercase md:text-5xl sm:text-2xl text-xl font-semibold sm:py-6 py-2 leading-[100%] relative ${
							activeImage?.id === image?.id
								? "mix-blend-difference z-20 text-foreground"
								: "text-foreground"
						}`}
					>
						{image.alt}
					</h2>
					<button
						className={`sm:block hidden p-4 rounded-full transition-[background-color,color] duration-300 ease-out ${
							activeImage?.id === image?.id
								? "mix-blend-difference z-20 bg-background text-foreground"
								: ""
						}`}
					>
						<MoveUpRight className="w-8 h-8" />
					</button>
					<div
						className={`h-[2px] dark:bg-background bg-background absolute bottom-0 left-0 transition-[width] duration-300 ease-linear ${
							activeImage?.id === image?.id ? "w-full" : "w-0"
						}`}
					/>
				</div>
			))}
			{isDesktop && activeImage && (
				<Image
					height={200}
					width={200}
					src={activeImage.src}
					alt={activeImage.alt}
					className={`fixed dark:bg-background bg-background object-cover pointer-events-none z-10 w-[300px] h-[400px] rounded-lg`}
					style={{
						left: `${cursorPosition.x}px`,
						top: `${cursorPosition.y}px`,
						transform: `translate(-50%, -50%) scale(${scale})`,
						opacity: opacity,
					}}
				/>
			)}
		</div>
	);
};

export default ImageReveal;
```

## Attribution

Source: UI Layouts · Original: https://www.ui-layouts.com/components/image-reveal

Adapted from the original. Credit the original author when you ship this.
