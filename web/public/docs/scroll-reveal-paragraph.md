# Scroll Reveal Paragraph

Paragraph printed in faint grey that fills in to full contrast one word at a time, tied to how far it has scrolled up the screen.

**Interaction.** Scrolling drives the whole effect: words light up left to right as the paragraph rises through the upper half of the screen, and dim again if you scroll back down.

- Categories: Text Animations
- Tags: scroll-driven
- Import: `@/components/ui/scroll-reveal-paragraph`
- Inspiration: SmoothUI (adaptation) — https://smoothui.dev/doc/text/scroll-reveal-paragraph

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scroll-reveal-paragraph.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `paragraph` *(required)* | `string` | — | — |
| `className` | `string` | `""` | — |

## Usage

```tsx
"use client";

import ScrollRevealParagraph from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-[28rem] items-center justify-center p-8">
			<ScrollRevealParagraph
				className="max-w-xl text-center text-xl"
				paragraph="Each word lights up as you scroll, so a long line of copy can still feel like it is arriving one beat at a time."
			/>
		</div>
	);
}
```

## Source

### `components/ui/scroll-reveal-paragraph.tsx`

```tsx
"use client";

import { useRef } from "react";

import { motion, useScroll, useTransform } from "motion/react";

// Credit:
// https://smoothui.dev/doc/text/scroll-reveal-paragraph

interface ScrollRevealParagraphProps {
	paragraph: string;
	className?: string;
}

export default function ScrollRevealParagraph({
	paragraph,
	className = "",
}: ScrollRevealParagraphProps) {
	const container = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start 0.9", "start 0.25"],
	});

	const words = paragraph.split(" ");

	return (
		<p ref={container} className={`text-lg leading-relaxed ${className}`}>
			{words.map((word, i) => {
				const start = i / words.length;
				const end = start + 1 / words.length;
				return (
					<Word
						key={`word-${i}-${word.slice(0, 3)}`}
						progress={scrollYProgress}
						range={[start, end]}
					>
						{word}
					</Word>
				);
			})}
		</p>
	);
}

interface WordProps {
	children: string;
	progress: any;
	range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
	const opacity = useTransform(progress, range, [0, 1]);

	return (
		<span className="relative mr-2 inline-block">
			<span className="text-foreground/10">{children}</span>
			<motion.span
				className="text-foreground absolute inset-0"
				style={{ opacity }}
			>
				{children}
			</motion.span>
		</span>
	);
};
```

## Attribution

Source: SmoothUI · Original: https://smoothui.dev/doc/text/scroll-reveal-paragraph

Adapted from the original. Credit the original author when you ship this.
