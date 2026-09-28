# Colorful Text

Headline text where every letter takes its own colour from a rotating rainbow palette.

**Interaction.** Runs on its own — every few seconds the palette reshuffles and the letters recolour in a left-to-right ripple, each one blurring, fading and hopping up slightly as its new colour lands.

- Categories: Text
- Tags: autoplay
- Import: `@/components/ui/colorful-text`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/colourful-text

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/colorful-text.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` *(required)* | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { ColourfulText } from "./component";
import { motion } from "motion/react";

export default function ColourfulTextDemo() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<motion.img
				src="/itjustworks.jpg"
				className="h-full w-full object-cover absolute inset-0 mask-[radial-gradient(circle,transparent,black_80%)] pointer-events-none"
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.5 }}
				transition={{ duration: 1 }}
			/>
			<h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-secondary relative z-2 font-sans">
				The best <ColourfulText text={"components"} /> <br /> you will ever
				find
			</h1>
		</div>
	);
}
```

## Source

### `components/ui/colorful-text.tsx`

```tsx
"use client";

import React from "react";

import { motion } from "motion/react";

// Credit:
// https://ui.aceternity.com/components/colourful-text

export function ColourfulText({ text }: { text: string }) {
	const colors = [
		"rgb(131, 179, 32)",
		"rgb(47, 195, 106)",
		"rgb(42, 169, 210)",
		"rgb(4, 112, 202)",
		"rgb(107, 10, 255)",
		"rgb(183, 0, 218)",
		"rgb(218, 0, 171)",
		"rgb(230, 64, 92)",
		"rgb(232, 98, 63)",
		"rgb(249, 129, 47)",
	];

	const [currentColors, setCurrentColors] = React.useState(colors);
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			const shuffled = [...colors].sort(() => Math.random() - 0.5);
			setCurrentColors(shuffled);
			setCount((prev) => prev + 1);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return text.split("").map((char, index) => (
		<motion.span
			key={`${char}-${count}-${index}`}
			initial={{
				y: 0,
			}}
			animate={{
				color: currentColors[index % currentColors.length],
				y: [0, -3, 0],
				scale: [1, 1.01, 1],
				filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
				opacity: [1, 0.8, 1],
			}}
			transition={{
				duration: 0.5,
				delay: index * 0.05,
			}}
			className="inline-block whitespace-pre font-sans tracking-tight"
		>
			{char}
		</motion.span>
	));
}
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/colourful-text

Adapted from the original. Credit the original author when you ship this.
