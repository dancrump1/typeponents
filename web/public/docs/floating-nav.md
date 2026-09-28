# Floating Nav

- Categories: Navigation
- Tags: scroll-driven, hover
- Import: `@/components/ui/floating-nav`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/floating-navbar

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/floating-nav.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `@tabler/icons-react`
- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `navItems` | `{ name: string; link: string; icon?: React.ReactElement; }[]` | `navItemsExample` | — |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { FloatingNav } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="h-screen overflow-auto">
				<div className="h-[200vh] " />
				<FloatingNav />
			</div>
		</div>
	);
}
```

## Source

### `components/ui/floating-nav.tsx`

```tsx
"use client";

import React, { useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";

// https://ui.aceternity.com/components/floating-navbar

const navItemsExample = [
	{
		name: "Home",
		link: "/",
		icon: <IconHome className="h-4 w-4 text-foreground dark:text-foreground" />,
	},
	{
		name: "About",
		link: "/about",
		icon: <IconUser className="h-4 w-4 text-foreground dark:text-foreground" />,
	},
	{
		name: "Contact",
		link: "/contact",
		icon: (
			<IconMessage className="h-4 w-4 text-foreground dark:text-foreground" />
		),
	},
];

export const FloatingNav = ({
	navItems = navItemsExample,
	className,
}: {
	navItems: {
		name: string;
		link: string;
		icon?: React.ReactElement;
	}[];
	className?: string;
}) => {
	const { scrollYProgress } = useScroll();

	const [visible, setVisible] = useState(false);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		// Check if current is not undefined and is a number
		if (typeof current === "number") {
			let direction = current! - scrollYProgress.getPrevious()!;

			if (scrollYProgress.get() < 0.05) {
				setVisible(false);
			} else {
				if (direction < 0) {
					setVisible(true);
				} else {
					setVisible(false);
				}
			}
		}
	});

	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{
					opacity: 1,
					y: -100,
				}}
				animate={{
					y: visible ? 0 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{
					duration: 0.2,
				}}
				className={cn(
					"flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/20 rounded-full dark:bg-background bg-background shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-5000 pr-2 pl-8 py-2  items-center justify-center space-x-4",
					className
				)}
			>
				{navItems.map((navItem: any, idx: number) => (
					<Link
						key={`link=${idx}`}
						href={navItem.link}
						className={cn(
							"relative dark:text-foreground items-center flex space-x-1 text-foreground dark:hover:text-foreground hover:text-foreground"
						)}
					>
						<span className="block sm:hidden">{navItem.icon}</span>
						<span className="hidden sm:block text-sm">
							{navItem.name}
						</span>
					</Link>
				))}
				<button className="border text-sm font-medium relative border-neutral-200 dark:border-white/20 text-foreground dark:text-foreground px-4 py-2 rounded-full">
					<span>Login</span>
					<span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-linear-to-r from-transparent via-blue-500 to-transparent  h-px" />
				</button>
			</motion.div>
		</AnimatePresence>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/floating-navbar

Adapted from the original. Credit the original author when you ship this.
