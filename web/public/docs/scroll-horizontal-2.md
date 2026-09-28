# Scroll Horizontal 2

- Categories: Special Effects & FX
- Tags: scroll-driven, hover
- Import: `@/components/ui/scroll-horizontal-2`
- Inspiration: UI Layouts (adaptation) — https://www.ui-layouts.com/components/horizontal-scroll

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scroll-horizontal-2.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import React from "react";

import ScrollHorizontal from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ScrollHorizontal />
		</div>
	);
}
```

## Source

### `components/ui/scroll-horizontal-2.tsx`

```tsx
"use client";

// * based on: https://gist.github.com/coleturner/34396fb826c12fbd88d6591173d178c2
import { useEffect, useRef, useState } from "react";

import {
	motion,
	MotionProps,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "motion/react";

export function throttle(fn: (...args: any[]) => any, wait: number) {
	let shouldWait = false;

	return function throttledFunction(this: any, ...args: any[]) {
		if (!shouldWait) {
			fn.apply(this, args);
			shouldWait = true;
			setTimeout(() => (shouldWait = false), wait);
		}
	};
}
// Credit:
// https://www.ui-layouts.com/components/horizontal-scroll
export const items = [
	{
		id: 1,
		url: "/itjustworks.jpg",
	},
	{
		id: 2,
		url: "/itjustworks.jpg",
	},
	{
		id: 3,
		url: "/itjustworks.jpg",
	},
	{
		id: 4,
		url: "/itjustworks.jpg",
	},
	{
		id: 5,
		url: "/itjustworks.jpg",
	},

	{
		id: 7,
		url: "/itjustworks.jpg",
	},
	{
		id: 8,
		url: "/itjustworks.jpg",
	},

	{
		id: 91,
		url: "/itjustworks.jpg",
	},
	{
		id: 92,
		url: "/itjustworks.jpg",
	},
	{
		id: 10,
		url: "/itjustworks.jpg",
	},
	{
		id: 11,
		url: "/itjustworks.jpg",
	},
	{
		id: 12,
		url: "/itjustworks.jpg",
	},
	{
		id: 13,
		url: "/itjustworks.jpg",
	},
	{
		id: 14,
		url: "/itjustworks.jpg",
	},
	{
		id: 15,
		url: "/itjustworks.jpg",
	},
	{
		id: 16,
		url: "/itjustworks.jpg",
	},
];

// * based on: https://gist.github.com/coleturner/34396fb826c12fbd88d6591173d178c2
function useElementViewportPosition(ref: React.RefObject<HTMLElement | null>) {
	const [position, setPosition] = useState<[number, number]>([0, 0]);

	useEffect(() => {
		if (!ref || !ref.current) return;

		const pageHeight = document.body.scrollHeight;
		const start = ref.current.offsetTop;
		const end = start + ref.current.offsetHeight;

		setPosition([start / pageHeight, end / pageHeight]);
	}, []);

	return { position };
}

const slideAnimation: MotionProps = {
	variants: {
		full: { backgroundColor: "#008299" },
		partial: { backgroundColor: "#ffffff" },
	},
	initial: "partial",
	whileInView: "full",
	viewport: { amount: 1, once: false },
};

export default function ScrollHorizontal() {
	const mainRef = useRef<HTMLDivElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const { position } = useElementViewportPosition(mainRef);
	//   const { ref, start, end } = useRefScrollProgress(mainRef)
	const [carouselEndPosition, setCarouselEndPosition] = useState(0);
	const { scrollYProgress, scrollY } = useScroll();
	const x = useTransform(scrollYProgress, position, [0, carouselEndPosition]);

	useMotionValueEvent(scrollY, "change");


	useEffect(() => {
		if (!carouselRef || !carouselRef.current) return;
		const parent = carouselRef.current.parentElement;
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;

		const resetCarouselEndPosition = () => {
			if (carouselRef && carouselRef.current) {
				const newPosition =
					carouselRef.current.clientWidth -
					window.innerWidth +
					scrollbarWidth +
					(parent as HTMLElement).offsetLeft * 2;

				setCarouselEndPosition(-newPosition);
			}
		};

		resetCarouselEndPosition();
		const handleResize = throttle(resetCarouselEndPosition, 10);

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<section ref={mainRef}>
				<div className="w-full mx-auto" style={{ height: "300vh" }}>
					<div className="sticky top-0 h-screen w-full flex flex-col items-start justify-center overflow-hidden">
						<motion.div
							ref={carouselRef}
							className="flex gap-10"
							style={{ x }}
						>
							{items.map((item, index) => (
								<motion.div
									{...slideAnimation}
									key={item.id + "scroll-2-horizontal-item"}
									className="group relative h-[300px] w-[300px] overflow-hidden bg-background"
								>
									<motion.img
										key={item.id}
										className="w-full shrink-0 h-full object-cover"
										src={item?.url}
										alt={"img"}
									/>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</section>
			<footer className="group ">
				<h1 className="text-[16vw] group-hover:translate-y-4 translate-y-20 leading-[100%] uppercase font-semibold text-center bg-linear-to-r from-background to-background bg-clip-text text-transparent transition-all ease-linear">
					ui-layout
				</h1>
				<section className="bg-background h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full">
					Thanks for Scrolling
				</section>
			</footer>
		</>
	);
}
```

## Attribution

Source: UI Layouts · Original: https://www.ui-layouts.com/components/horizontal-scroll

Adapted from the original. Credit the original author when you ship this.
