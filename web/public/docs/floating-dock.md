# Floating Dock

- Categories: Special Effects & FX
- Tags: spring, hover, cursor-tracking
- Import: `@/components/ui/floating-dock`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/floating-dock

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/floating-dock.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `@tabler/icons-react`
- `motion`
- `react-icons`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `{ title: string; icon: React.ReactNode; href: string; }[]` | `links` | — |
| `desktopClassName` | `string` | — | — |
| `mobileClassName` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { FloatingDock } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<FloatingDock />
		</div>
	);
}
```

## Source

### `components/ui/floating-dock.tsx`

```tsx
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { useRef, useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import {
	IconBrandGithub,
	IconBrandX,
	IconExchange,
	IconHome,
	IconNewSection,
	IconTerminal2,
} from "@tabler/icons-react";
import {
	AnimatePresence,
	motion,
	MotionValue,
	useMotionValue,
	useSpring,
	useTransform,
} from "motion/react";
import { FiMenu } from "react-icons/fi";

// https://ui.aceternity.com/components/floating-dock

const links = [
	{
		title: "Home",
		icon: (
			<IconHome className="h-full w-full text-foreground dark:text-foreground" />
		),
		href: "#",
	},

	{
		title: "Products",
		icon: (
			<IconTerminal2 className="h-full w-full text-foreground dark:text-foreground" />
		),
		href: "#",
	},
	{
		title: "Components",
		icon: (
			<IconNewSection className="h-full w-full text-foreground dark:text-foreground" />
		),
		href: "#",
	},
	{
		title: "Aceternity UI",
		icon: (
			<img
				src="https://assets.aceternity.com/logo-dark.png"
				width={20}
				height={20}
				alt="Aceternity Logo"
			/>
		),
		href: "#",
	},
	{
		title: "Changelog",
		icon: (
			<IconExchange className="h-full w-full text-foreground dark:text-foreground" />
		),
		href: "#",
	},

	{
		title: "Twitter",
		icon: (
			<IconBrandX className="h-full w-full text-foreground dark:text-foreground" />
		),
		href: "#",
	},
	{
		title: "GitHub",
		icon: (
			<IconBrandGithub className="h-full w-full text-foreground dark:text-foreground" />
		),
		href: "#",
	},
];

export const FloatingDock = ({
	items = links,
	desktopClassName,
	mobileClassName,
}: {
	items: { title: string; icon: React.ReactNode; href: string }[];
	desktopClassName?: string;
	mobileClassName?: string;
}) => {
	return (
		<>
			<FloatingDockDesktop items={items} className={desktopClassName} />
			<FloatingDockMobile items={items} className={mobileClassName} />
		</>
	);
};

const FloatingDockMobile = ({
	items,
	className,
}: {
	items: { title: string; icon: React.ReactNode; href: string }[];
	className?: string;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<div className={cn("relative block md:hidden", className)}>
			<AnimatePresence>
				{open && (
					<motion.div
						layoutId="nav"
						className="absolute top-12 right-12 mb-2 inset-x-0 flex flex-col gap-2"
					>
						{items.map((item, idx) => (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: -10 }}
								animate={{
									opacity: 1,
									y: 0,
								}}
								exit={{
									opacity: 0,
									y: -10,
									transition: {
										delay: (items.length - 1 - idx) * 0.05,
									},
								}}
								transition={{ delay: (items.length - 1 + idx) * 0.05 }}
							>
								<Link
									href={item.href}
									key={item.title}
									className="h-10 w-10 rounded-full bg-background dark:bg-background flex items-center justify-center"
								>
									<div className="h-4 w-4">{item.icon}</div>
								</Link>
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
			<button
				onClick={() => setOpen(!open)}
				className="h-10 w-10 rounded-full bg-background dark:bg-background flex items-center justify-center"
			>
				<FiMenu className="" />
			</button>
		</div>
	);
};

const FloatingDockDesktop = ({
	items,
	className,
}: {
	items: { title: string; icon: React.ReactNode; href: string }[];
	className?: string;
}) => {
	let mouseX = useMotionValue(Infinity);
	return (
		<motion.div
			onMouseMove={(e) => mouseX.set(e.pageX)}
			onMouseLeave={() => mouseX.set(Infinity)}
			className={cn(
				"mx-auto hidden md:flex h-16 gap-4 items-end  rounded-2xl bg-background dark:bg-background px-4 pb-3",
				className
			)}
		>
			{items.map((item) => (
				<IconContainer mouseX={mouseX} key={item.title} {...item} />
			))}
		</motion.div>
	);
};

function IconContainer({
	mouseX,
	title,
	icon,
	href,
}: {
	mouseX: MotionValue;
	title: string;
	icon: React.ReactNode;
	href: string;
}) {
	let ref = useRef<HTMLDivElement>(null);

	let distance = useTransform(mouseX, (val) => {
		let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

		return val - bounds.x - bounds.width / 2;
	});

	let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
	let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

	let widthTransformIcon = useTransform(
		distance,
		[-150, 0, 150],
		[20, 40, 20]
	);
	let heightTransformIcon = useTransform(
		distance,
		[-150, 0, 150],
		[20, 40, 20]
	);

	let width = useSpring(widthTransform, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});
	let height = useSpring(heightTransform, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});

	let widthIcon = useSpring(widthTransformIcon, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});
	let heightIcon = useSpring(heightTransformIcon, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});

	const [hovered, setHovered] = useState(false);

	return (
		<Link href={href}>
			<motion.div
				ref={ref}
				style={{ width, height }}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className="aspect-square rounded-full bg-background dark:bg-background flex items-center justify-center relative"
			>
				<AnimatePresence>
					{hovered && (
						<motion.div
							initial={{ opacity: 0, y: 10, x: "-50%" }}
							animate={{ opacity: 1, y: 0, x: "-50%" }}
							exit={{ opacity: 0, y: 2, x: "-50%" }}
							className="px-2 py-0.5 whitespace-pre rounded-md bg-background border dark:bg-background dark:border-neutral-900 dark:text-foreground border-gray-200 text-foreground absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
						>
							{title}
						</motion.div>
					)}
				</AnimatePresence>
				<motion.div
					style={{ width: widthIcon, height: heightIcon }}
					className="flex items-center justify-center"
				>
					{icon}
				</motion.div>
			</motion.div>
		</Link>
	);
}
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/floating-dock

Adapted from the original. Credit the original author when you ship this.
