# Following Pointer

- Categories: Cursor & Pointer Effects
- Tags: hover, cursor-tracking
- Import: `@/components/ui/following-pointer`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/following-pointer

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/following-pointer.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |
| `title` | `React.ReactNode` | — | — |

## Usage

```tsx
import { FollowerPointerCard } from "./component";

export default function Usage() {
	return (
		<div className="mx-auto w-80">
			<FollowerPointerCard
				title={
					<TitleComponent
						title={blogContent.author}
						avatar={blogContent.authorAvatar}
					/>
				}
			>
				<div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-background transition duration-200 hover:shadow-xl">
					<div className="relative aspect-16/10 w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-background">
						<img
							src={blogContent.image}
							alt="thumbnail"
							className="h-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
						/>
					</div>
					<div className="p-4">
						<h2 className="my-4 text-lg font-bold text-secondary">
							{blogContent.title}
						</h2>
						<h2 className="my-4 text-sm font-normal text-secondary">
							{blogContent.description}
						</h2>
						<div className="mt-10 flex flex-row items-center justify-between">
							<span className="text-sm text-secondary">
								{blogContent.date}
							</span>
							<div className="relative z-10 block rounded-xl bg-background px-6 py-2 text-xs font-bold text-secondary">
								Read More
							</div>
						</div>
					</div>
				</div>
			</FollowerPointerCard>
		</div>
	);
}

export const blogContent = {
	slug: "amazing-tailwindcss-grid-layouts",
	author: "Manu Arora",
	date: "28th March, 2023",
	title: "Amazing Tailwindcss Grid Layout Usages",
	description:
		"Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
	image: "/itjustworks.jpg",
	authorAvatar: "/itjustworks.jpg",
};

export const TitleComponent = ({
	title,
	avatar,
}: {
	title: string;
	avatar: string;
}) => (
	<div className="flex items-center space-x-2">
		<img
			src={avatar}
			height="20"
			width="20"
			alt="thumbnail"
			className="rounded-full border-2 border-white"
		/>
		<p>{title}</p>
	</div>
);
```

## Source

### `components/ui/following-pointer.tsx`

```tsx
// Core component that receives mouse positions and renders pointer and content

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue } from "motion/react";

// https://ui.aceternity.com/components/following-pointer

export const FollowerPointerCard = ({
	children,
	className,
	title,
}: {
	children: React.ReactNode;
	className?: string;
	title?: string | React.ReactNode;
}) => {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const ref = React.useRef<HTMLDivElement>(null);
	const [rect, setRect] = useState<DOMRect | null>(null);
	const [isInside, setIsInside] = useState<boolean>(false); // Add this line

	useEffect(() => {
		if (ref.current) {
			setRect(ref.current.getBoundingClientRect());
		}
	}, []);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (rect) {
			const scrollX = window.scrollX;
			const scrollY = window.scrollY;
			x.set(e.clientX - rect.left + scrollX);
			y.set(e.clientY - rect.top + scrollY);
		}
	};
	const handleMouseLeave = () => {
		setIsInside(false);
	};

	const handleMouseEnter = () => {
		setIsInside(true);
	};
	return (
		<div
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			style={{
				cursor: "none",
			}}
			ref={ref}
			className={cn("relative", className)}
		>
			<AnimatePresence mode="wait">
				{isInside && <FollowPointer x={x} y={y} title={title} />}
			</AnimatePresence>
			{children}
		</div>
	);
};

export const FollowPointer = ({
	x,
	y,
	title,
}: {
	x: any;
	y: any;
	title?: string | React.ReactNode;
}) => {
	const colors = [
		"var(--sky-500)",
		"var(--neutral-500)",
		"var(--teal-500)",
		"var(--green-500)",
		"var(--blue-500)",
		"var(--red-500)",
		"var(--yellow-500)",
	];
	return (
		<motion.div
			className="h-4 w-4 rounded-full absolute z-40"
			style={{
				top: y,
				left: x,
				pointerEvents: "none",
			}}
			initial={{
				scale: 1,
				opacity: 1,
			}}
			animate={{
				scale: 1,
				opacity: 1,
			}}
			exit={{
				scale: 0,
				opacity: 0,
			}}
		>
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="1"
				viewBox="0 0 16 16"
				className="h-6 w-6 text-sky-500 transform -rotate-70 -translate-x-[12px] -translate-y-[10px] stroke-sky-600"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
			</svg>
			<motion.div
				style={{
					backgroundColor:
						colors[Math.floor(Math.random() * colors.length)],
				}}
				initial={{
					scale: 0.5,
					opacity: 0,
				}}
				animate={{
					scale: 1,
					opacity: 1,
				}}
				exit={{
					scale: 0.5,
					opacity: 0,
				}}
				className={
					"px-2 py-2 bg-background text-foreground whitespace-nowrap min-w-max text-xs rounded-full"
				}
			>
				{title || `William Shakespeare`}
			</motion.div>
		</motion.div>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/following-pointer

Adapted from the original. Credit the original author when you ship this.
