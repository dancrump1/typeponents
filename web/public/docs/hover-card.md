# Hover Card

- Categories: Cards
- Tags: cursor-tracking
- Import: `@/components/ui/hover-card`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/evervault-card

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/hover-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
import React from "react";

import { EvervaultCard, Icon } from "./component";

export default function EvervaultCardDemo() {
	return (
		<div className="border border-black/20 dark:border-white/20 flex flex-col items-start max-w-sm mx-auto p-4 relative h-120">
			<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-secondary text-secondary" />
			<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-secondary text-secondary" />
			<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-secondary text-secondary" />
			<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-secondary text-secondary" />

			<EvervaultCard text="hover" />

			<h2 className="dark:text-secondary text-secondary mt-4 text-sm font-light">
				Hover over this card to reveal an awesome effect. Running out of
				copy here.
			</h2>
			<p className="text-sm border font-light dark:border-white/20 border-black/20 rounded-full mt-4 text-secondary dark:text-secondary px-2 py-0.5">
				Watch me hover
			</p>
		</div>
	);
}
```

## Source

### `components/ui/hover-card.tsx`

```tsx
"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

// https://ui.aceternity.com/components/evervault-card

export const EvervaultCard = ({
	text,
	className,
}: {
	text?: string;
	className?: string;
}) => {
	let mouseX = useMotionValue(0);
	let mouseY = useMotionValue(0);

	const [randomString, setRandomString] = useState("");

	useEffect(() => {
		let str = generateRandomString(1500);
		setRandomString(str);
	}, []);

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		let { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);

		const str = generateRandomString(1500);
		setRandomString(str);
	}

	return (
		<div
			className={cn(
				"p-0.5  bg-transparent aspect-square  flex items-center justify-center w-full h-full relative",
				className
			)}
		>
			<div
				onMouseMove={onMouseMove}
				className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
			>
				<CardPattern
					mouseX={mouseX}
					mouseY={mouseY}
					randomString={randomString}
				/>
				<div className="relative z-10 flex items-center justify-center">
					<div className="relative h-44 w-44  rounded-full flex items-center justify-center text-foreground font-bold text-4xl">
						<div className="absolute w-full h-full bg-background/80 dark:bg-background/80 blur-xs rounded-full" />
						<span className="dark:text-foreground text-foreground z-20">
							{text}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
	let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
	let style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<div className="pointer-events-none">
			<div className="absolute inset-0 rounded-2xl  mask-[linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
			<motion.div
				className="absolute inset-0 rounded-2xl bg-linear-to-r from-green-500 to-blue-700 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
				style={style}
			/>
			<motion.div
				className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100"
				style={style}
			>
				<p className="absolute inset-x-0 text-xs h-full wrap-break-word whitespace-pre-wrap text-foreground font-mono font-bold transition duration-500">
					{randomString}
				</p>
			</motion.div>
		</div>
	);
}

const characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	return result;
};

export const Icon = ({ className, ...rest }: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className={className}
			{...rest}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 6v12m6-6H6"
			/>
		</svg>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/evervault-card

Adapted from the original. Credit the original author when you ship this.
