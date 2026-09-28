# Text Split

- Categories: Text, Text Animations
- Tags: hover
- Import: `@/components/ui/text-split`
- Inspiration: berlix.vercel.app (adaptation) — https://berlix.vercel.app/docs/text-split

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-split.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |
| `topClassName` | `string` | — | — |
| `bottomClassName` | `string` | — | — |
| `maxMove` | `number` | `50` | — |
| `falloff` | `number` | `0.3` | — |

## Usage

```tsx
"use client";

import TextSplit from "./component";

export default function TextRotateUsage() {
	return (
		<div className="w-dvw h-dvh text-2xl sm:text-3xl md:text-5xl flex flex-row items-center justify-center font-overused-grotesk bg-background dark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24">
			<TextSplit
				className="text-9xl font-semibold uppercase"
				topClassName="text-red-500"
				bottomClassName="text-secondary dark:text-secondary"
			>
				Berlix UI
			</TextSplit>
			;{" "}
		</div>
	);
}
```

## Source

### `components/ui/text-split.tsx`

```tsx
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Credit:
// https://berlix.vercel.app/docs/text-split

interface TextSplitProps {
	children: string;
	className?: string;
	topClassName?: string;
	bottomClassName?: string;
	maxMove?: number;
	falloff?: number;
}

const TextSplit = ({
	children,
	className,
	topClassName,
	bottomClassName,
	maxMove = 50,
	falloff = 0.3,
}: TextSplitProps) => {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);

	const getOffset = (index: number) => {
		if (hoverIndex === null) return 0;
		const distance = Math.abs(index - hoverIndex);
		return Math.max(0, maxMove * (1 - distance * falloff));
	};

	return (
		<div
			className={cn("relative flex items-center justify-center ", className)}
		>
			{children.split("").map((char, index) => {
				const offset = getOffset(index);
				const displayChar = char === " " ? "\u00A0" : char;

				return (
					<div
						key={`${char}-${index}`}
						className="relative flex flex-col h-[1em] w-auto leading-none"
						onMouseEnter={() => setHoverIndex(index)}
						onMouseLeave={() => setHoverIndex(null)}
					>
						<motion.span
							initial={false}
							animate={{
								y: `-${offset}%`,
							}}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className={cn("overflow-hidden", topClassName)}
						>
							{displayChar}
						</motion.span>

						<motion.span
							initial={false}
							animate={{
								y: `${offset}%`,
							}}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className={cn("overflow-hidden", bottomClassName)}
						>
							<span className="block -translate-y-1/2">
								{displayChar}
							</span>
						</motion.span>
					</div>
				);
			})}
		</div>
	);
};

export default TextSplit;
```

## Attribution

Source: berlix.vercel.app · Original: https://berlix.vercel.app/docs/text-split

Adapted from the original. Credit the original author when you ship this.
