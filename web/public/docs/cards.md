# Cards

Set of flip-card building blocks — container, header, divider, front and back faces, and buttons — for cards with two sides.

**Interaction.** Clicking the card button turns the card on its vertical axis, swinging the current face away while the other face swings in to replace it.

- Categories: Cards
- Import: `@/components/ui/cards`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/cards.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import {
	CardContainer,
	CardContent,
	CardHeader,
	CardHr,
	FlipCardBackContent,
	FlipCardButton,
} from "./component";
import { useState } from "react";

export default function Usage() {
	const [flipped, setFlipped] = useState(false);

	return (
		<div className="flex items-center justify-center p-8">
			<CardContainer>
				{!flipped ? (
					<CardContent key="front">
						<CardHeader>Hover to explore</CardHeader>
						<CardHr />
						<div className="p-6 text-center text-muted-foreground">
							A flip card built from compound card primitives.
						</div>
						<FlipCardButton onClick={() => setFlipped(true)}>
							Flip card
						</FlipCardButton>
					</CardContent>
				) : (
					<FlipCardBackContent key="back">
						<CardHeader>Back side</CardHeader>
						<div className="p-6 text-center text-muted-foreground">
							Reverse content with the same motion system.
						</div>
						<FlipCardButton onClick={() => setFlipped(false)}>
							Flip back
						</FlipCardButton>
					</FlipCardBackContent>
				)}
			</CardContainer>
		</div>
	);
}
```

## Source

### `components/ui/cards.tsx`

```tsx
import React, { forwardRef } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const CardContainer = ({ children, className }) => {
	return (
		<div
			className={cn(
				"group basis-64 xl:basis-[355px] leading-tight lg:grow",
				className
			)}
		>
			<div
				className={cn(
					"relative h-full transition-all duration-500 transform-3d"
				)}
			>
				<AnimatePresence mode="popLayout" initial={false}>
					{children}
				</AnimatePresence>
			</div>
		</div>
	);
};

const CardHeader = ({ children }) => {
	return (
		<div className="bg-backgroundSecondary text-foreground justify-center flex items-center">
			<span className="sm:min-w-[290px] mx-auto py-4 lg:px-6 lg:py-8 text-center text-balance">
				{children}
			</span>
		</div>
	);
};

const CardHr = () => (
	<hr className="w-[140px] my-2 mx-auto border-background border-b-2" />
);

/** Custom component note: When using popLayout mode, any immediate child of AnimatePresence that's a custom component must be wrapped in React's forwardRef function, forwarding the provided ref to the DOM node you wish to pop out of the layout. */
const CardContent = forwardRef(({ children, key }, ref) => {
	return (
		<motion.div
			ref={ref}
			key={key}
			initial={{ rotateY: 180 }}
			animate={{ rotateY: 0 }}
			exit={{ rotateY: -180 }}
			transition={{ duration: 0.5 }}
			className={cn(
				"flex flex-col w-full backface-hidden rounded-xl min-h-[400px] lg:min-h-[500px] overflow-hidden shadow-lg bg-background"
			)}
		>
			{children}
		</motion.div>
	);
});

/** Custom component note: When using popLayout mode, any immediate child of AnimatePresence that's a custom component must be wrapped in React's forwardRef function, forwarding the provided ref to the DOM node you wish to pop out of the layout. */
const FlipCardBackContent = forwardRef(({ children, key }, ref) => {
	return (
		<motion.div
			ref={ref}
			key={key}
			initial={{ rotateY: 180 }}
			animate={{ rotateY: 0 }}
			exit={{ rotateY: -180 }}
			transition={{ duration: 0.5 }}
			className={cn(
				"w-full rounded-xl backface-hidden overflow-hidden shadow-lg "
			)}
		>
			<div className="flex flex-col gap-2 rounded-xl min-h-[400px] lg:min-h-[500px]">
				{children}
			</div>
		</motion.div>
	);
});

const FlipCardButton = ({ children, onClick }) => {
	return (
		<button
			className="button red-to-background my-6 mx-auto"
			onClick={() => onClick()}
		>
			{children}
		</button>
	);
};

const LinkCardButton = ({ children, url, target }) => {
	return (
		<Link
			className="button red-to-background my-6 mx-auto"
			href={url || ""}
			target={target}
			referrerPolicy={target && "no-referrer"}
		>
			{children}
		</Link>
	);
};

export {
	CardContainer,
	CardHeader,
	CardHr,
	CardContent,
	FlipCardBackContent,
	FlipCardButton,
	LinkCardButton,
};
```
