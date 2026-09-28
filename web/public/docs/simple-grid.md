# Simple Grid

- Categories: Grids & Layouts
- Tags: hover
- Import: `@/components/ui/simple-grid`
- Inspiration: Eclair UI (adaptation) — https://eclairui.gopx.dev/components/grids/gopx-bento-grid

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/simple-grid.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `clsx`
- `motion`
- `react-icons`

## Usage

```tsx
"use client";

import React from "react";

import SimpleGrid from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<SimpleGrid />{" "}
		</div>
	);
}
```

## Source

### `components/ui/simple-grid.tsx`

```tsx
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";
import { motion } from "motion/react";
import { FaArrowRightLong } from "react-icons/fa6";

// Credit:
// https://eclairui.gopx.dev/components/grids/gopx-bento-grid

interface BentoCardProps {
	bgImage: string;
	className?: string;
	url: string;
	title: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
	bgImage,
	className = "",
	url,
	title,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link href={url} className={clsx("block", className)}>
			<motion.div
				className="relative w-full h-full rounded-lg overflow-hidden group"
				onHoverStart={() => setIsHovered(true)}
				onHoverEnd={() => setIsHovered(false)}
			>
				<div className="absolute inset-0 bg-background dark:bg-background">
					<Image
						src={bgImage}
						alt={title}
						layout="fill"
						objectFit="cover"
						className="transition-[filter,opacity,transform] duration-300 ease-in-out group-hover:blur-xs group-hover:scale-110 opacity-80 group-hover:opacity-100"
					/>
				</div>
				<div className="relative z-10 p-3 h-full flex flex-col justify-between text-foreground">
					<div className="self-end group-hover:-rotate-45 transition-transform duration-700">
						<FaArrowRightLong size={16} />
					</div>
					<div>
						<ToolTitle
							isHovered={isHovered}
							className="text-xs sm:text-sm md:text-lg font-bold"
						>
							{title}
						</ToolTitle>
					</div>
				</div>
			</motion.div>
		</Link>
	);
};

interface ToolTitleProps {
	children: string;
	isHovered: boolean;
	className?: string;
}

const ToolTitle: React.FC<ToolTitleProps> = ({
	children,
	isHovered,
	className,
}) => {
	return (
		<motion.div
			className={clsx(
				"font-roboto relative block overflow-hidden",
				"transition-colors duration-300",
				className
			)}
		>
			<motion.div>
				{children.split("").map((letter, index) => (
					<motion.span
						key={index + "simple-grid"}
						initial={{ y: 0 }}
						animate={isHovered ? { y: "-100%" } : { y: 0 }}
						transition={{
							duration: 0.35,
							ease: "easeInOut",
							delay: 0.025 * index,
						}}
						className="inline-block"
					>
						{letter}
					</motion.span>
				))}
			</motion.div>
			<motion.div className="absolute inset-0">
				{children.split("").map((letter, index) => (
					<motion.span
						key={index + "simple-grid-child"}
						initial={{ y: "100%" }}
						animate={isHovered ? { y: 0 } : { y: "100%" }}
						transition={{
							duration: 0.35,
							ease: "easeInOut",
							delay: 0.025 * index,
						}}
						className="inline-block text-foreground"
					>
						{letter}
					</motion.span>
				))}
			</motion.div>
		</motion.div>
	);
};

interface Card {
	bgImage: string;
	className?: string;
	url: string;
	title: string;
}

const SimpleGrid: React.FC = () => {
	const cards: Card[] = [
		{
			bgImage: `/itjustworks.jpg`,
			url: "/components",
			className: "col-span-1 row-span-1",
			title: "Components",
		},
		{
			bgImage: `/itjustworks.jpg`,
			url: "/tools/shadows",
			className: "col-span-2 row-span-1",
			title: "Shadow Generator",
		},
		{
			bgImage: `/itjustworks.jpg`,
			className: "col-span-1 row-span-1",
			url: "/store?tab=Templates",
			title: "Templates",
		},
		{
			bgImage: `/itjustworks.jpg`,
			url: "/store?tab=Component%20Packs",
			className: "col-span-1 row-span-1",
			title: "Packs",
		},
		{
			bgImage: `/itjustworks.jpg`,
			className: "col-span-1 row-span-1",
			url: "/pricing",
			title: "Pricing",
		},
		{
			bgImage: `/itjustworks.jpg`,
			className: "col-span-2 row-span-1",
			url: "/tools/colors",
			title: "Color Generator",
		},
		{
			bgImage: `/itjustworks.jpg`,
			className: "col-span-1 row-span-1",
			url: "/faqs",
			title: "FAQs",
		},
	];

	return (
		<div className="w-full aspect-square grid grid-cols-3 grid-rows-3 gap-4">
			{cards.map((card, index) => (
				<BentoCard key={index + "simple-grid-bento"} {...card} />
			))}
		</div>
	);
};

export default SimpleGrid;
```

## Attribution

Source: Eclair UI · Original: https://eclairui.gopx.dev/components/grids/gopx-bento-grid

Adapted from the original. Credit the original author when you ship this.
