# Text Morph

- Categories: Text, Text Animations
- Tags: spring
- Import: `@/components/ui/text-morph`
- Inspiration: Motion Primitives (adaptation) — https://motion-primitives.com/docs/text-morph

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-morph.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `ElementType<any, keyof JSX.IntrinsicElements>` | — | — |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |
| `variants` | `Variants` | — | — |
| `transition` | `Transition` | — | — |

## Usage

```tsx
"use client";

import { useState } from "react";

import { TextMorph } from "./component";

export default function TextMorphButton() {
	const [text, setText] = useState("Continue");

	return (
		<button
			onClick={() => setText(text === "Continue" ? "Confirm" : "Continue")}
			className="flex h-10 w-[120px] shrink-0 items-center justify-center rounded-full bg-background px-4 text-base font-medium text-secondary shadow-2xs transition-colors hover:bg-background dark:bg-background dark:text-secondary dark:hover:bg-background"
		>
			<TextMorph>{text}</TextMorph>
		</button>
	);
}
```

## Source

### `components/ui/text-morph.tsx`

```tsx
"use client";

import { useId, useMemo } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Transition, Variants } from "motion/react";

// Credit:
// https://motion-primitives.com/docs/text-morph

export type TextMorphProps = {
	children: string;
	as?: React.ElementType;
	className?: string;
	style?: React.CSSProperties;
	variants?: Variants;
	transition?: Transition;
};

export function TextMorph({
	children,
	as: Component = "p",
	className,
	style,
	variants,
	transition,
}: TextMorphProps) {
	const uniqueId = useId();

	const characters = useMemo(() => {
		const charCounts: Record<string, number> = {};

		return children.split("").map((char) => {
			const lowerChar = char.toLowerCase();
			charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;

			return {
				id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
				label: char === " " ? "\u00A0" : char,
			};
		});
	}, [children, uniqueId]);

	const defaultVariants: Variants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const defaultTransition: Transition = {
		type: "spring",
		stiffness: 280,
		damping: 18,
		mass: 0.3,
	};

	return (
		<Component className={cn(className)} aria-label={children} style={style}>
			<AnimatePresence mode="popLayout" initial={false}>
				{characters.map((character) => (
					<motion.span
						key={character.id}
						layoutId={character.id}
						className="inline-block"
						aria-hidden="true"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={variants || defaultVariants}
						transition={transition || defaultTransition}
					>
						{character.label}
					</motion.span>
				))}
			</AnimatePresence>
		</Component>
	);
}
```

## Attribution

Source: Motion Primitives · Original: https://motion-primitives.com/docs/text-morph

Adapted from the original. Credit the original author when you ship this.
