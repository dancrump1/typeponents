# Fuzzy Overlay

- Categories: Special Effects & FX
- Import: `@/components/ui/fuzzy-overlay`
- Inspiration: Hover.dev (adaptation) — https://www.hover.dev/black-noise.png

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/fuzzy-overlay.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import FuzzyOverlay from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<FuzzyOverlay />
		</div>
	);
}
```

## Source

### `components/ui/fuzzy-overlay.tsx`

```tsx
import React from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const FuzzyOverlay = ({ className }: { className?: string }) => {
	return (
		<motion.div
			initial={{ transform: "translateX(-10%) translateY(-10%)" }}
			animate={{
				transform: "translateX(10%) translateY(10%)",
			}}
			transition={{
				repeat: Infinity,
				duration: 0.2,
				ease: "linear",
				repeatType: "mirror",
			}}
			// You can download these PNGs here:
			// https://www.hover.dev/black-noise.png
			// https://www.hover.dev/noise.png
			style={{
				backgroundImage: 'url("/dist/local/black-noise.png")',
				// backgroundImage: 'url("local/noise.png")',
			}}
			className={cn(
				"pointer-events-none absolute -inset-full opacity-0",
				className
			)}
		/>
	);
};

export default FuzzyOverlay;
```

## Attribution

Source: Hover.dev · Original: https://www.hover.dev/black-noise.png

Adapted from the original. Credit the original author when you ship this.
