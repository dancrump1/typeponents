# Scroll Float

- Categories: Text Animations
- Tags: scroll-driven
- Import: `@/components/ui/scroll-float`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scroll-float.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `gsap`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `scrollContainerRef` | `React.RefObject<HTMLElement>` | — | — |
| `containerClassName` | `string` | `""` | — |
| `textClassName` | `string` | `""` | — |
| `animationDuration` | `number` | `1` | — |
| `ease` | `string` | `"back.inOut(2)"` | — |
| `scrollStart` | `string` | `"center bottom+=50%"` | — |
| `scrollEnd` | `string` | `"bottom bottom-=40%"` | — |
| `stagger` | `number` | `0.03` | — |

## Usage

```tsx
"use client";

import React from "react";

import ScrollFloat from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ScrollFloat>test test 123</ScrollFloat>
		</div>
	);
}
```

## Source

### `components/ui/scroll-float.tsx`

```tsx
import React, { ReactNode, RefObject, useEffect, useMemo, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
	children: ReactNode;
	scrollContainerRef?: RefObject<HTMLElement>;
	containerClassName?: string;
	textClassName?: string;
	animationDuration?: number;
	ease?: string;
	scrollStart?: string;
	scrollEnd?: string;
	stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
	children,
	scrollContainerRef,
	containerClassName = "",
	textClassName = "",
	animationDuration = 1,
	ease = "back.inOut(2)",
	scrollStart = "center bottom+=50%",
	scrollEnd = "bottom bottom-=40%",
	stagger = 0.03,
}) => {
	const containerRef = useRef<HTMLHeadingElement>(null);

	const splitText = useMemo(() => {
		const text = typeof children === "string" ? children : "";
		return text.split("").map((char, index) => (
			<span className="inline-block" key={index + "scroll-float"}>
				{char === " " ? "\u00A0" : char}
			</span>
		));
	}, [children]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const scroller =
			scrollContainerRef && scrollContainerRef.current
				? scrollContainerRef.current
				: window;

		const charElements = el.querySelectorAll(".inline-block");

		gsap.fromTo(
			charElements,
			{
				willChange: "opacity, transform",
				opacity: 0,
				yPercent: 120,
				scaleY: 2.3,
				scaleX: 0.7,
				transformOrigin: "50% 0%",
			},
			{
				duration: animationDuration,
				ease: ease,
				opacity: 1,
				yPercent: 0,
				scaleY: 1,
				scaleX: 1,
				stagger: stagger,
				scrollTrigger: {
					trigger: el,
					scroller,
					start: scrollStart,
					end: scrollEnd,
					scrub: true,
				},
			}
		);
	}, [
		scrollContainerRef,
		animationDuration,
		ease,
		scrollStart,
		scrollEnd,
		stagger,
	]);

	return (
		<h2
			ref={containerRef}
			className={`my-5 overflow-hidden ${containerClassName}`}
		>
			<span
				className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-normal ${textClassName}`}
			>
				{splitText}
			</span>
		</h2>
	);
};

export default ScrollFloat;
```
