# Scroll Reveal

Large block of heading text that sits at a slight tilt and straightens as it scrolls into view, its words going from faint and blurred to solid.

**Interaction.** Scrolling is the only trigger: the text rotates upright as it enters the viewport, and the words clear up one after another from left to right, reversing if you scroll back up.

- Categories: Text Animations
- Tags: scroll-driven
- Import: `@/components/ui/scroll-reveal`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scroll-reveal.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `gsap`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `scrollContainerRef` | `React.RefObject<HTMLElement>` | — | — |
| `enableBlur` | `boolean` | `true` | — |
| `baseOpacity` | `number` | `0.1` | — |
| `baseRotation` | `number` | `3` | — |
| `blurStrength` | `number` | `4` | — |
| `containerClassName` | `string` | `""` | — |
| `textClassName` | `string` | `""` | — |
| `rotationEnd` | `string` | `"bottom bottom"` | — |
| `wordAnimationEnd` | `string` | `"bottom bottom"` | — |

## Usage

```tsx
"use client";

import React from "react";

import ScrollReveal from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ScrollReveal
				baseOpacity={0}
				enableBlur={true}
				baseRotation={5}
				blurStrength={10}
			>
				When does a man die? When he is hit by a bullet? No! When he suffers
				a disease? No! When he ate a soup made out of a poisonous mushroom?
				No! A man dies when he is forgotten!
			</ScrollReveal>{" "}
		</div>
	);
}
```

## Source

### `components/ui/scroll-reveal.tsx`

```tsx
import React, { ReactNode, RefObject, useEffect, useMemo, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
	children: ReactNode;
	scrollContainerRef?: RefObject<HTMLElement>;
	enableBlur?: boolean;
	baseOpacity?: number;
	baseRotation?: number;
	blurStrength?: number;
	containerClassName?: string;
	textClassName?: string;
	rotationEnd?: string;
	wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
	children,
	scrollContainerRef,
	enableBlur = true,
	baseOpacity = 0.1,
	baseRotation = 3,
	blurStrength = 4,
	containerClassName = "",
	textClassName = "",
	rotationEnd = "bottom bottom",
	wordAnimationEnd = "bottom bottom",
}) => {
	const containerRef = useRef<HTMLHeadingElement>(null);

	const splitText = useMemo(() => {
		const text = typeof children === "string" ? children : "";
		return text.split(/(\s+)/).map((word, index) => {
			if (word.match(/^\s+$/)) return word;
			return (
				<span className="inline-block" key={index + "scroll-reveal"}>
					{word}
				</span>
			);
		});
	}, [children]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const scroller =
			scrollContainerRef && scrollContainerRef.current
				? scrollContainerRef.current
				: window;

		gsap.fromTo(
			el,
			{ transformOrigin: "0% 50%", rotate: baseRotation },
			{
				ease: "none",
				rotate: 0,
				scrollTrigger: {
					trigger: el,
					scroller,
					start: "top bottom",
					end: rotationEnd,
					scrub: true,
				},
			}
		);

		const wordElements = el.querySelectorAll<HTMLElement>(".word");

		gsap.fromTo(
			wordElements,
			{ opacity: baseOpacity, willChange: "opacity" },
			{
				ease: "none",
				opacity: 1,
				stagger: 0.05,
				scrollTrigger: {
					trigger: el,
					scroller,
					start: "top bottom-=20%",
					end: wordAnimationEnd,
					scrub: true,
				},
			}
		);

		if (enableBlur) {
			gsap.fromTo(
				wordElements,
				{ filter: `blur(${blurStrength}px)` },
				{
					ease: "none",
					filter: "blur(0px)",
					stagger: 0.05,
					scrollTrigger: {
						trigger: el,
						scroller,
						start: "top bottom-=20%",
						end: wordAnimationEnd,
						scrub: true,
					},
				}
			);
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [
		scrollContainerRef,
		enableBlur,
		baseRotation,
		baseOpacity,
		rotationEnd,
		wordAnimationEnd,
		blurStrength,
	]);

	return (
		<h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
			<p
				className={`text-[clamp(1.6rem,4vw,3rem)] leading-normal font-semibold ${textClassName}`}
			>
				{splitText}
			</p>
		</h2>
	);
};

export default ScrollReveal;
```
