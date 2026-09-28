# Parallax Floating

- Categories: Media Galleries, Images, Cursor & Pointer Effects, Grids & Layouts
- Tags: autoplay
- Import: `@/components/ui/parallax-floating`
- Inspiration: Fancy Components (adaptation) — https://www.fancycomponents.dev/docs/components/image/parallax-floating

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/parallax-floating.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Registry dependencies

- `text-rotate`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |
| `sensitivity` | `number` | `1` | — |
| `easingFactor` | `number` | `0.05` | — |

## Usage

```tsx
"use client";

import React from "react";

import Link from "next/link";

import Floating, {
	FloatingElement,
} from "./component";
import TextRotate from "@/registry/components/text-rotate/component";
import { LayoutGroup, motion } from "motion/react";

const exampleImages = [
	{
		url: "/itjustworks.jpg",
		author: "Branislav Rodman",
		title: "A Black and White Photo of a Woman Brushing Her Teeth",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
		title: "Neon Palm",
		author: "Tim Mossholder",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
		author: "ANDRII SOLOK",
		title: "A blurry photo of a crowd of people",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
		author: "Wesley Tingey",
		title: "Rippling Crystal Blue Water",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
		author: "Serhii Tyaglovsky",
		title: "Mann im schwarzen Hemd unter blauem Himmel",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
		author: "Vladimir Yelizarov",
		title: "A women with a flower crown on her head",
	},
	{
		url: "/itjustworks.jpg",
		title: "A blurry photo of white flowers in a field",
		author: "Eugene Golovesov",
		link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
	},
	{
		url: "/itjustworks.jpg",
		author: "Mathilde Langevin",
		link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
		title: "A table topped with two wine glasses and plates",
	},
];

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
				<Floating sensitivity={-0.5} className="h-full">
					<FloatingElement
						depth={0.5}
						className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
					>
						<motion.img
							src={exampleImages[0].url}
							alt={exampleImages[0].title}
							className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-3 shadow-2xl rounded-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={1}
						className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
					>
						<motion.img
							src={exampleImages[1].url}
							alt={exampleImages[1].title}
							className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.7 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={4}
						className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
					>
						<motion.img
							src={exampleImages[2].url}
							alt={exampleImages[2].title}
							className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.9 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={2}
						className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
					>
						<motion.img
							src={exampleImages[3].url}
							alt={exampleImages[3].title}
							className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-6 rounded-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.1 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={1}
						className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
					>
						<motion.img
							src={exampleImages[4].url}
							alt={exampleImages[4].title}
							className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-19 rounded-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.3 }}
						/>
					</FloatingElement>
				</Floating>

				<div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
					<motion.h1
						className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-4"
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						transition={{
							duration: 0.2,
							ease: "easeOut",
							delay: 0.3,
						}}
					>
						<span>Make your </span>
						<LayoutGroup>
							<motion.span layout className="flex whitespace-pre">
								<motion.span
									layout
									className="flex whitespace-pre"
									transition={{
										type: "spring",
										damping: 30,
										stiffness: 400,
									}}
								>
									website{" "}
								</motion.span>
								<TextRotate
									texts={[
										"fancy",
										"fun",
										"lovely ♥",
										"weird",
										"🪩 funky",
										"💃🕺",
										"sexy",
										"🕶️ cool",
										"go 🚀",
										"🔥🔥🔥",
										"over-animated?",
										"pop ✨",
										"rock 🤘",
									]}
									mainClassName="overflow-hidden pr-3 text-primary py-0 pb-2 md:pb-4 rounded-xl"
									staggerDuration={0.03}
									staggerFrom="last"
									rotationInterval={3000}
									transition={{
										type: "spring",
										damping: 30,
										stiffness: 400,
									}}
								/>
							</motion.span>
						</LayoutGroup>
					</motion.h1>
					<motion.p
						className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12"
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						transition={{
							duration: 0.2,
							ease: "easeOut",
							delay: 0.5,
						}}
					>
						with a growing library of ready-to-use react components &
						microinteractions. free & open source.
					</motion.p>

					<div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
						<motion.button
							className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-secondary bg-foreground px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
							animate={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 20 }}
							transition={{
								duration: 0.2,
								ease: "easeOut",
								delay: 0.7,
								scale: { duration: 0.2 },
							}}
							whileHover={{
								scale: 1.05,
								transition: {
									type: "spring",
									damping: 30,
									stiffness: 400,
								},
							}}
						>
							<Link href="/docs/introduction">
								Check docs <span className="font-serif ml-1">→</span>
							</Link>
						</motion.button>
						<motion.button
							className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-secondary bg-background px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
							animate={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 20 }}
							transition={{
								duration: 0.2,
								ease: "easeOut",
								delay: 0.7,
								scale: { duration: 0.2 },
							}}
							whileHover={{
								scale: 1.05,
								transition: {
									type: "spring",
									damping: 30,
									stiffness: 400,
								},
							}}
						>
							<Link href="https://github.com/danielpetho/fancy">
								★ on GitHub
							</Link>
						</motion.button>
					</div>
				</div>
			</section>{" "}
		</div>
	);
}
```

## Source

### `components/ui/parallax-floating.tsx`

```tsx
"use client";

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";

import { cn } from "@/lib/utils";
import { useMousePositionRef } from "@/hooks/use-mouse-position";
import { useAnimationFrame } from "motion/react";

// Credit:
// https://www.fancycomponents.dev/docs/components/image/parallax-floating

interface FloatingContextType {
	registerElement: (
		id: string,
		element: HTMLDivElement,
		depth: number
	) => void;
	unregisterElement: (id: string) => void;
}

const FloatingContext = createContext<FloatingContextType | null>(null);

interface FloatingProps {
	children: ReactNode;
	className?: string;
	sensitivity?: number;
	easingFactor?: number;
}

const Floating = ({
	children,
	className,
	sensitivity = 1,
	easingFactor = 0.05,
	...props
}: FloatingProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const elementsMap = useRef(
		new Map<
			string,
			{
				element: HTMLDivElement;
				depth: number;
				currentPosition: { x: number; y: number };
			}
		>()
	);
	const mousePositionRef = useMousePositionRef(containerRef);

	const registerElement = useCallback(
		(id: string, element: HTMLDivElement, depth: number) => {
			elementsMap.current.set(id, {
				element,
				depth,
				currentPosition: { x: 0, y: 0 },
			});
		},
		[]
	);

	const unregisterElement = useCallback((id: string) => {
		elementsMap.current.delete(id);
	}, []);

	useAnimationFrame(() => {
		if (!containerRef.current) return;

		elementsMap.current.forEach((data) => {
			const strength = (data.depth * sensitivity) / 20;

			// Calculate new target position
			const newTargetX = mousePositionRef.current.x * strength;
			const newTargetY = mousePositionRef.current.y * strength;

			// Check if we need to update
			const dx = newTargetX - data.currentPosition.x;
			const dy = newTargetY - data.currentPosition.y;

			// Update position only if we're still moving
			data.currentPosition.x += dx * easingFactor;
			data.currentPosition.y += dy * easingFactor;

			data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`;
		});
	});

	return (
		<FloatingContext.Provider value={{ registerElement, unregisterElement }}>
			<div
				ref={containerRef}
				className={cn("absolute top-0 left-0 w-full h-full", className)}
				{...props}
			>
				{children}
			</div>
		</FloatingContext.Provider>
	);
};

export default Floating;

interface FloatingElementProps {
	children: ReactNode;
	className?: string;
	depth?: number;
}

export const FloatingElement = ({
	children,
	className,
	depth = 1,
}: FloatingElementProps) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const idRef = useRef(Math.random().toString(36).substring(7));
	const context = useContext(FloatingContext);

	useEffect(() => {
		if (!elementRef.current || !context) return;

		const nonNullDepth = depth ?? 0.01;

		context.registerElement(idRef.current, elementRef.current, nonNullDepth);
		return () => context.unregisterElement(idRef.current);
	}, [depth]);

	return (
		<div
			ref={elementRef}
			className={cn("absolute will-change-transform", className)}
		>
			{children}
		</div>
	);
};
```

### `hooks/use-mouse-position.ts`

```tsx
import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
	containerRef?: RefObject<HTMLElement | SVGElement>
) => {
	const positionRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const updatePosition = (x: number, y: number) => {
			if (containerRef && containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const relativeX = x - rect.left;
				const relativeY = y - rect.top;

				// Calculate relative position even when outside the container
				positionRef.current = { x: relativeX, y: relativeY };
			} else {
				positionRef.current = { x, y };
			}
		};

		const handleMouseMove = (ev: MouseEvent) => {
			updatePosition(ev.clientX, ev.clientY);
		};

		const handleTouchMove = (ev: TouchEvent) => {
			const touch = ev.touches[0];
			updatePosition(touch.clientX, touch.clientY);
		};

		// Listen for both mouse and touch events
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("touchmove", handleTouchMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, [containerRef]);


	return positionRef;
};
```

## Attribution

Source: Fancy Components · Original: https://www.fancycomponents.dev/docs/components/image/parallax-floating

Adapted from the original. Credit the original author when you ship this.
