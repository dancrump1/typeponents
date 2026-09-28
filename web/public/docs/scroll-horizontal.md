# Scroll Horizontal

- Categories: Special Effects & FX
- Import: `@/components/ui/scroll-horizontal`
- Inspiration: UI Layouts (adaptation) — https://www.ui-layouts.com/components/horizontal-scroll

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scroll-horizontal.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lenis`
- `motion`

## Usage

```tsx
"use client";

import React from "react";

import HorizontalScroll from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<HorizontalScroll />
		</div>
	);
}
```

## Source

### `components/ui/scroll-horizontal.tsx`

```tsx
// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import { ReactLenis } from "lenis/react";
import { animate, scroll, spring } from "motion";

// Credit:
// https://www.ui-layouts.com/components/horizontal-scroll

export default function HorizontalScroll(): JSX.Element {
	const ulRef = useRef<HTMLUListElement | null>();

	useEffect(() => {
		const items = document.querySelectorAll(".scroll-item");

		if (ulRef.current) {
			const controls = animate(
				ulRef.current,
				{
					transform: ["none", `translateX(-${items.length - 1}00vw)`],
				},
				{ easing: spring() }
			);
			scroll(controls, { target: document.querySelector("section") });
		}

		const segmentLength = 1 / items.length;
		items.forEach((item, i) => {
			const header = item.querySelector("h2");

			scroll(animate([header], { x: [800, -800] }), {
				target: document.querySelector("section"),
				offset: [
					[i * segmentLength, 1],
					[(i + 1) * segmentLength, 0],
				],
			});
		});
	}, []);

	return (
		<ReactLenis root>
			<main>
				<article>
					<header className="text-foreground relative  w-full bg-slate-950  grid place-content-center  h-[80vh]">
						<div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

						<h1 className="text-6xl font-bold text-center tracking-tight">
							I know You Love to Scroll <br />
							So Scroll
						</h1>
					</header>
					<section className="h-[500vh] relative">
						<ul ref={ulRef} className="flex sticky top-0">
							<li className="scroll-item h-screen w-screen bg-red-400 flex flex-col justify-center overflow-hidden  items-center">
								<h2 className="text-[20vw] font-semibold relative bottom-5 inline-block text-foreground">
									PASSION
								</h2>
								<Image
									src="/itjustworks.jpg"
									className="2xl:w-[550px] w-[380px] absolute bottom-0"
									width={500}
									height={500}
									alt="image"
								/>
							</li>
							<li className="scroll-item h-screen w-screen bg-blue-400 flex flex-col justify-center overflow-hidden  items-center">
								<h2 className="text-[20vw] font-semibold relative bottom-5 inline-block text-foreground">
									WORK
								</h2>
								<Image
									src="/itjustworks.jpg"
									className="2xl:w-[550px] w-[380px] absolute bottom-0"
									width={500}
									height={500}
									alt="image"
								/>
							</li>
							<li className="scroll-item h-screen w-screen bg-orange-400 flex flex-col justify-center overflow-hidden  items-center">
								<h2 className="text-[20vw] font-semibold relative bottom-5 inline-block text-foreground">
									MOTIVATION
								</h2>
								<Image
									src="/itjustworks.jpg"
									className="2xl:w-[550px] w-[380px] absolute bottom-0"
									width={500}
									height={500}
									alt="image"
								/>
							</li>
							<li className="scroll-item h-screen w-screen bg-yellow-400 flex flex-col justify-center overflow-hidden  items-center">
								<h2 className="text-[20vw] font-semibold relative bottom-5 inline-block text-foreground">
									INSPIRATION
								</h2>
								<Image
									src="/itjustworks.jpg"
									className="2xl:w-[550px] w-[380px] absolute bottom-0"
									width={500}
									height={500}
									alt="image"
								/>
							</li>
							<li className="scroll-item h-screen w-screen bg-green-400 flex flex-col justify-center overflow-hidden  items-center">
								<h2 className="text-[20vw] font-semibold relative bottom-5 inline-block text-foreground">
									BELIVE
								</h2>
								<Image
									src="/itjustworks.jpg"
									className="2xl:w-[550px] w-[380px] absolute bottom-0"
									width={500}
									height={500}
									alt="image"
								/>
							</li>
						</ul>
					</section>
					<footer className="bg-red-600 text-foreground grid place-content-center h-[80vh]">
						<p>
							Created By{" "}
							<a target="_blank" href="https://twitter.com/mattgperry">
								Matt Perry
							</a>
						</p>
					</footer>
				</article>
				<div className="progress fixed left-0 right-0  h-2 rounded-full bg-red-600 bottom-[50px] scale-x-0"></div>
			</main>
		</ReactLenis>
	);
}
```

## Attribution

Source: UI Layouts · Original: https://www.ui-layouts.com/components/horizontal-scroll

Adapted from the original. Credit the original author when you ship this.
