# 3D Card

Card wrapper that tilts in 3D toward the pointer, with its text and image layered at different depths.

**Interaction.** Moving the pointer across the card tilts it to follow, and the title, image and buttons lift forward off the surface; the card snaps flat again when the pointer leaves.

- Categories: Cards, 3D & Canvas
- Tags: featured, hover, cursor-tracking
- Import: `@/components/ui/3d-card`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/3d-card-effect

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/3d-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |
| `containerClassName` | `string` | — | — |
| `id` | `string` | — | — |
| `title` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import {
	CardBody,
	CardContainer,
	CardItem,
} from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CardContainer className="inter-var">
				<CardBody className="bg-background relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-background dark:border-white/20 border-black/10 w-auto sm:w-120 h-auto rounded-xl p-6 border  ">
					<CardItem
						translateZ="50"
						className="text-xl font-bold text-secondary dark:text-secondary"
					>
						Make things float in air
					</CardItem>
					<CardItem
						as="p"
						translateZ="60"
						className="text-secondary text-sm max-w-sm mt-2 dark:text-secondary"
					>
						Hover over this card to unleash the power of CSS perspective
					</CardItem>
					<CardItem translateZ="100" className="w-full mt-4">
						<img
							src="/itjustworks.jpg"
							height="1000"
							width="1000"
							className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
							alt="thumbnail"
						/>
					</CardItem>
					<div className="flex justify-between items-center mt-20">
						<CardItem
							translateZ={20}
							as="a"
							href="https://twitter.com/mannupaaji"
							target="__blank"
							className="px-4 py-2 rounded-xl text-xs font-normal dark:text-secondary"
						>
							Try now →
						</CardItem>
						<CardItem
							translateZ={20}
							as="button"
							className="px-4 py-2 rounded-xl bg-background dark:bg-background dark:text-secondary text-secondary text-xs font-bold"
						>
							Sign up
						</CardItem>
					</div>
				</CardBody>
			</CardContainer>
		</div>
	);
}
```

## Source

### `components/ui/3d-card.tsx`

```tsx
"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

import { cn } from "@/lib/utils";

// https://ui.aceternity.com/components/3d-card-effect

const MouseEnterContext = createContext<
	[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
	children,
	className,
	containerClassName,
	id,
	title,
}: {
	children?: React.ReactNode;
	className?: string;
	containerClassName?: string;
	id?: string;
	title?: string;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMouseEntered, setIsMouseEntered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		const { left, top, width, height } =
			containerRef.current.getBoundingClientRect();
		const x = (e.clientX - left - width / 2) / 25;
		const y = (e.clientY - top - height / 2) / 25;
		containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
	};

	const handleMouseEnter = () => {
		setIsMouseEntered(true);
		if (!containerRef.current) return;
	};

	const handleMouseLeave = () => {
		if (!containerRef.current) return;
		setIsMouseEntered(false);
		containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
	};
	return (
		<MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
			<div
				className={cn(
					"pt-20 flex items-center justify-center",
					containerClassName
				)}
				style={{
					perspective: "1000px",
				}}
				id={id}
				title={title}
			>
				<div
					ref={containerRef}
					onMouseEnter={handleMouseEnter}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					className={cn(
						"flex items-center justify-center relative transition-transform duration-200 ease-linear",
						className
					)}
					style={{
						transformStyle: "preserve-3d",
					}}
				>
					{children}
				</div>
			</div>
		</MouseEnterContext.Provider>
	);
};

export const CardBody = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"transform-3d  *:transform-3d",
				className
			)}
		>
			{children}
		</div>
	);
};

export const CardItem = ({
	as: Tag = "div",
	children,
	className,
	translateX = 0,
	translateY = 0,
	translateZ = 0,
	rotateX = 0,
	rotateY = 0,
	rotateZ = 0,
	...rest
}: {
	as?: React.ElementType;
	children: React.ReactNode;
	className?: string;
	translateX?: number | string;
	translateY?: number | string;
	translateZ?: number | string;
	rotateX?: number | string;
	rotateY?: number | string;
	rotateZ?: number | string;
	[key: string]: any;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isMouseEntered] = useMouseEnter();

	useEffect(() => {
		handleAnimations();
	}, [isMouseEntered]);

	const handleAnimations = () => {
		if (!ref.current) return;
		if (isMouseEntered) {
			ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
		} else {
			ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
		}
	};

	return (
		<Tag
			ref={ref}
			className={cn("transition duration-200 ease-linear", className)}
			{...rest}
		>
			{children}
		</Tag>
	);
};

// Create a hook to use the context
export const useMouseEnter = () => {
	const context = useContext(MouseEnterContext);
	if (context === undefined) {
		throw new Error("useMouseEnter must be used within a MouseEnterProvider");
	}
	return context;
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/3d-card-effect

Adapted from the original. Credit the original author when you ship this.
