# Text Enhanced

Bold italic word stacked with a staircase of coloured drop shadows fanning out behind it.

**Interaction.** Hovering the word collapses the whole stack of coloured shadows, leaving flat type; moving away lets the shadows fan back out behind it.

- Categories: Text
- Tags: hover
- Import: `@/components/ui/text-enhanced`
- Inspiration: Kokonut UI (adaptation) — https://kokonutui.com/docs/components/text#text---enhanced

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-enhanced.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"DRIVE"` | — |
| `className` | `string` | `""` | — |
| `shadowColors` | `{ first?: string; second?: string; third?: string; fourth…` | `{ first: "#07bccc", second: "#e601c0"…` | — |

## Usage

```tsx
"use client";

import React from "react";

import TextEnhanced from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<TextEnhanced />
		</div>
	);
}
```

## Source

### `components/ui/text-enhanced.tsx`

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// Credit:
// https://kokonutui.com/docs/components/text#text---enhanced

interface AnimatedTextProps {
	text?: string;
	className?: string;
	shadowColors?: {
		first?: string;
		second?: string;
		third?: string;
		fourth?: string;
		glow?: string;
	};
}

export default function TextEnhanced({
	text = "DRIVE",
	className = "",
	shadowColors = {
		first: "#07bccc",
		second: "#e601c0",
		third: "#e9019a",
		fourth: "#f40468",
		glow: "#f40468",
	},
}: AnimatedTextProps) {
	const textShadowStyle = {
		textShadow: `10px 10px 0px ${shadowColors.first}, 
                     15px 15px 0px ${shadowColors.second}, 
                     20px 20px 0px ${shadowColors.third}, 
                     25px 25px 0px ${shadowColors.fourth}, 
                     45px 45px 10px ${shadowColors.glow}`,
	};

	const noShadowStyle = {
		textShadow: "none",
	};

	return (
		<div className="w-full text-center">
			<motion.div
				className={cn(
					"w-full text-center cursor-pointer text-3xl font-bold",
					"transition-all duration-200 ease-in-out tracking-widest",
					"text-foreground dark:text-foreground italic",
					"stroke-[#d6f4f4]",
					className
				)}
				style={textShadowStyle}
				whileHover={noShadowStyle}
			>
				{text}
			</motion.div>
		</div>
	);
}
```

## Attribution

Source: Kokonut UI · Original: https://kokonutui.com/docs/components/text#text---enhanced

Adapted from the original. Credit the original author when you ship this.
