# Parallax Carousel

- Categories: Carousels
- Tags: spring, drag, autoplay
- Import: `@/components/ui/parallax-carousel`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/parallax-carousel.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `react-icons`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `CarouselItem[]` | — | — |
| `baseWidth` | `number` | — | — |
| `autoplay` | `boolean` | — | — |
| `autoplayDelay` | `number` | — | — |
| `pauseOnHover` | `boolean` | — | — |
| `loop` | `boolean` | — | — |
| `round` | `boolean` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import ParallaxCarousel from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div style={{ height: "600px", position: "relative" }}>
				<ParallaxCarousel
					baseWidth={300}
					autoplay={true}
					autoplayDelay={3000}
					pauseOnHover={true}
					loop={true}
					round={false}
				/>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/parallax-carousel.tsx`

```tsx
import { useEffect, useRef, useState } from "react";

import { motion, PanInfo, useMotionValue, useTransform } from "motion/react";
// replace icons with your own if needed
import {
	FiCircle,
	FiCode,
	FiFileText,
	FiLayers,
	FiLayout,
} from "react-icons/fi";

/** Default content, inlined so this component ships standalone. */
const componentDefaults = {
	props: {
		items: [
			{
				title: "Text Animations",
				description: "Cool text animations for your projects.",
				id: 1,
				icon: "FiFileText",
			},
			{
				title: "Animations",
				description: "Smooth animations for your projects.",
				id: 2,
				icon: "FiCircle",
			},
			{
				title: "Components",
				description: "Reusable components for your projects.",
				id: 3,
				icon: "FiLayers",
			},
			{
				title: "Backgrounds",
				description: "Beautiful backgrounds and patterns for your projects.",
				id: 4,
				icon: "FiLayout",
			},
			{
				title: "Common UI",
				description: "Common UI components are coming soon!",
				id: 5,
				icon: "FiCode",
			},
		],
	},
};

export interface CarouselItem {
	title: string;
	description: string;
	id: number;
	icon: JSX.Element;
}

type CarouselItemDefault = Omit<CarouselItem, "icon"> & { icon?: string };

export interface CarouselProps {
	items?: CarouselItem[];
	baseWidth?: number;
	autoplay?: boolean;
	autoplayDelay?: number;
	pauseOnHover?: boolean;
	loop?: boolean;
	round?: boolean;
}

const CAROUSEL_ICONS = {
	FiFileText,
	FiCircle,
	FiLayers,
	FiLayout,
	FiCode,
} as const;

function hydrateCarouselItems(items: CarouselItemDefault[]): CarouselItem[] {
	return items.map((item) => {
		const Icon =
			item.icon && item.icon in CAROUSEL_ICONS
				? CAROUSEL_ICONS[item.icon as keyof typeof CAROUSEL_ICONS]
				: FiFileText;
		return {
			...item,
			icon: <Icon className="h-[16px] w-[16px] text-foreground" />,
		};
	});
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function ParallaxCarousel(props: CarouselProps = {}): JSX.Element {
	// Defaults carry icons as string keys; callers pass real elements.
	const resolved = { ...componentDefaults.props, ...props } as Omit<
		CarouselProps,
		"items"
	> & { items?: CarouselItemDefault[] };
	const {
		items: rawItems = [],
		baseWidth = 300,
		autoplay = false,
		autoplayDelay = 3000,
		pauseOnHover = false,
		loop = false,
		round = false,
	} = resolved;
	const items = props.items?.length
		? props.items
		: hydrateCarouselItems(rawItems as CarouselItemDefault[]);
	const containerPadding = 16;
	const itemWidth = baseWidth - containerPadding * 2;
	const trackItemOffset = itemWidth + GAP;

	const carouselItems = loop ? [...items, items[0]] : items;
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const x = useMotionValue(0);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [isResetting, setIsResetting] = useState<boolean>(false);

	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (pauseOnHover && containerRef.current) {
			const container = containerRef.current;
			const handleMouseEnter = () => setIsHovered(true);
			const handleMouseLeave = () => setIsHovered(false);
			container.addEventListener("mouseenter", handleMouseEnter);
			container.addEventListener("mouseleave", handleMouseLeave);
			return () => {
				container.removeEventListener("mouseenter", handleMouseEnter);
				container.removeEventListener("mouseleave", handleMouseLeave);
			};
		}
	}, [pauseOnHover]);

	useEffect(() => {
		if (autoplay && (!pauseOnHover || !isHovered)) {
			const timer = setInterval(() => {
				setCurrentIndex((prev) => {
					if (prev === items.length - 1 && loop) {
						return prev + 1; // Animate to clone.
					}
					if (prev === carouselItems.length - 1) {
						return loop ? 0 : prev;
					}
					return prev + 1;
				});
			}, autoplayDelay);
			return () => clearInterval(timer);
		}
	}, [
		autoplay,
		autoplayDelay,
		isHovered,
		loop,
		items.length,
		carouselItems.length,
		pauseOnHover,
	]);

	const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

	const handleAnimationComplete = () => {
		if (loop && currentIndex === carouselItems.length - 1) {
			setIsResetting(true);
			x.set(0);
			setCurrentIndex(0);
			setTimeout(() => setIsResetting(false), 50);
		}
	};

	const handleDragEnd = (
		_: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	): void => {
		const offset = info.offset.x;
		const velocity = info.velocity.x;
		if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
			if (loop && currentIndex === items.length - 1) {
				setCurrentIndex(currentIndex + 1);
			} else {
				setCurrentIndex((prev) =>
					Math.min(prev + 1, carouselItems.length - 1)
				);
			}
		} else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
			if (loop && currentIndex === 0) {
				setCurrentIndex(items.length - 1);
			} else {
				setCurrentIndex((prev) => Math.max(prev - 1, 0));
			}
		}
	};

	const dragProps = loop
		? {}
		: {
				dragConstraints: {
					left: -trackItemOffset * (carouselItems.length - 1),
					right: 0,
				},
			};

	return (
		<div
			ref={containerRef}
			className={`relative overflow-hidden p-4 ${
				round
					? "rounded-full border border-white"
					: "rounded-[24px] border border-[#222]"
			}`}
			style={{
				width: `${baseWidth}px`,
				...(round && { height: `${baseWidth}px` }),
			}}
		>
			<motion.div
				className="flex"
				drag="x"
				{...dragProps}
				style={{
					width: itemWidth,
					gap: `${GAP}px`,
					perspective: 1000,
					perspectiveOrigin: `${
						currentIndex * trackItemOffset + itemWidth / 2
					}px 50%`,
					x,
				}}
				onDragEnd={handleDragEnd}
				animate={{ x: -(currentIndex * trackItemOffset) }}
				transition={effectiveTransition}
				onAnimationComplete={handleAnimationComplete}
			>
				{carouselItems.map((item, index) => {
					const range = [
						-(index + 1) * trackItemOffset,
						-index * trackItemOffset,
						-(index - 1) * trackItemOffset,
					];
					const outputRange = [90, 0, -90];
					const rotateY = useTransform(x, range, outputRange, {
						clamp: false,
					});
					return (
						<motion.div
							key={index + "parallax-carousel"}
							className={`relative shrink-0 flex flex-col ${
								round
									? "items-center justify-center text-center bg-background border-0"
									: "items-start justify-between bg-background border border-[#222] rounded-[12px]"
							} overflow-hidden cursor-grab active:cursor-grabbing`}
							style={{
								width: itemWidth,
								height: round ? itemWidth : "100%",
								rotateY: rotateY,
								...(round && { borderRadius: "50%" }),
							}}
							transition={effectiveTransition}
						>
							<div className={`${round ? "p-0 m-0" : "mb-4 p-5"}`}>
								<span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-background">
									{item.icon}
								</span>
							</div>
							<div className="p-5">
								<div className="mb-1 font-black text-lg text-foreground">
									{item.title}
								</div>
								<p className="text-sm text-foreground">{item.description}</p>
							</div>
						</motion.div>
					);
				})}
			</motion.div>
			<div
				className={`flex w-full justify-center ${
					round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
				}`}
			>
				<div className="mt-4 flex w-[150px] justify-between px-8">
					{items.map((_, index) => (
						<motion.div
							key={index + "parallax-carousel-item"}
							className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
								currentIndex % items.length === index
									? round
										? "bg-background"
										: "bg-background"
									: round
										? "bg-background"
										: "bg-[rgba(51,51,51,0.4)]"
							}`}
							animate={{
								scale: currentIndex % items.length === index ? 1.2 : 1,
							}}
							onClick={() => setCurrentIndex(index)}
							transition={{ duration: 0.15 }}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
```
