# Number Ticker

Numeric counter that runs up to its target figure, comma-grouped and set on fixed-width digits so it never jitters.

**Interaction.** The moment the number scrolls into view it races from zero to its final value and eases to a stop, counting down instead if you flip the direction. It fires once and can be held back by a delay.

- Categories: Data & Tables
- Tags: spring, scroll-driven
- Import: `@/components/ui/number-ticker`
- Inspiration: Magic UI (adaptation) — https://magicui.design/docs/components/number-ticker

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/number-ticker.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` *(required)* | `number` | — | — |
| `direction` | `"up" | "down"` | `"up"` | — |
| `className` | `string` | — | — |
| `delay` | `number` | `0` | — |

## Usage

```tsx
"use client";

import React from "react";

import NumberTicker from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<NumberTicker
				value={100}
				className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-secondary dark:text-secondary"
			/>
		</div>
	);
}
```

## Source

### `components/ui/number-ticker.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useInView, useMotionValue, useSpring } from "motion/react";

// https://magicui.design/docs/components/number-ticker

export default function NumberTicker({
	value,
	direction = "up",
	delay = 0,
	className,
}: {
	value: number;
	direction?: "up" | "down";
	className?: string;
	delay?: number; // delay in s
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const motionValue = useMotionValue(direction === "down" ? value : 0);
	const springValue = useSpring(motionValue, {
		damping: 30,
		stiffness: 100,
	});
	const isInView = useInView(ref, { once: true, margin: "0px" });

	useEffect(() => {
		isInView &&
			setTimeout(() => {
				motionValue.set(direction === "down" ? 0 : value);
			}, delay * 1000);
	}, [motionValue, isInView, delay, value, direction]);

	useEffect(
		() =>
			springValue.on("change", (latest) => {
				if (ref.current) {
					ref.current.textContent = Intl.NumberFormat("en-US").format(
						Number(latest.toFixed(0))
					);
				}
			}),
		[springValue]
	);

	return (
		<span className={cn("inline-block tabular-nums", className)} ref={ref} />
	);
}
```

## Attribution

Source: Magic UI · Original: https://magicui.design/docs/components/number-ticker

Adapted from the original. Credit the original author when you ship this.
