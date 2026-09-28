# Scroll Island

Floating pill docked at the bottom of the page showing a circular progress ring, the current section title and a scroll percentage.

**Interaction.** Scrolling fills the ring and updates the title and percentage; clicking the pill grows it upward into a list of section links that sharpen from blurred, and picking one jumps to that section and collapses the pill.

- Categories: Navigation
- Tags: spring, scroll-driven
- Import: `@/components/ui/scroll-island`
- Inspiration: Star UI (adaptation) — https://starui.link/docs/components/scroll-island

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scroll-island.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import React, { useCallback, useState } from "react";

import { ScrollIsland } from "./component";

export default function Usage() {
	const [titleEls, setTitleEls] = useState<HTMLElement[]>([]);

	const setupTitles = useCallback((node: HTMLDivElement) => {
		if (node) {
			const titleEls = Array.from(
				node.querySelectorAll(".component-container")
			);
			setTitleEls(titleEls.map((el) => el.children[0].children[0]));
		}
	}, []);
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ScrollIsland ref={setupTitles}>
				<h1>test test 123</h1>
				<section className="component-container">
					<p>yup!</p>
				</section>
				<section className="component-container">
					<p>yup!</p>
				</section>
				<section className="component-container">
					<p>yup!</p>
				</section>
				<section className="component-container">
					<p>yup!</p>
				</section>
				<section className="component-container">
					<p>yup!</p>
				</section>
				<section className="component-container">
					<p>yup!</p>
				</section>
			</ScrollIsland>
		</div>
	);
}
```

## Source

### `components/ui/scroll-island.tsx`

```tsx
"use client";

import { Fragment, useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import {
	AnimatePresence,
	motion,
	MotionConfig,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import type { HTMLMotionProps } from "motion/react";

// Credit:
// https://starui.link/docs/components/scroll-island

export function ScrollIsland({ children, containerRef, gridView }) {
	const [open, setOpen] = useState(false);
	const { scrollYProgress } = useScroll();
	const [percent, setPercent] = useState(0);
	const [titleEls, setTitleEls] = useState<HTMLElement[]>([]);
	const [currentTitle, setCurrentTitle] = useState("stack");

	const setupTitles = useCallback((node: HTMLDivElement) => {
		if (node) {
			const titleEls = Array.from(
				node.querySelectorAll(".component-container")
			);
			setTitleEls(titleEls.map((el) => el.children[0].children[0]));
		}
	}, []);

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setPercent(Math.floor(latest * 100));
		titleEls.forEach((el, index) => {
			const top = el.getBoundingClientRect().top;
			if (top >= 0 && top < 32) {
				setCurrentTitle(el.textContent || "");
			}
		});
	});

	return (
		<div
			className={cn("relative w-full grid grid-cols-1 gap-8", {
				"grid-cols-1": gridView === "1",
				"grid-cols-2": gridView === "2",
				"grid-cols-3": gridView === "3",
				"grid-cols-4": gridView === "4",
			})}
			ref={setupTitles}
		>
			<MotionConfig transition={{ type: "spring", bounce: 0.3 }}>
				<AnimatePresence>
					{open && <Overlay onClick={() => setOpen(false)} />}
				</AnimatePresence>
				{children}
				<motion.div
					className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-background text-foreground z-10 overflow-hidden"
					initial={false}
					style={{ borderRadius: 22 }}
					animate={{ width: open ? 320 : 260, height: open ? "auto" : 44 }}
				>
					<ol
						className="px-4 pt-4 overflow-auto max-h-96"
						style={{ marginBlockEnd: 44 }}
					>
						{titleEls.map((item) => {
							return (
								<motion.li
									key={item?.textContent
										?.replaceAll(" ", "")
										?.toLowerCase()}
									className={cn(
										"list-inside list-decimal transition-[filter] text-foreground",
										open ? "blur-none" : "blur-xs"
									)}
								>
									<a
										href={`#${item?.textContent
											?.replaceAll(" ", "")
											?.toLowerCase()}`}
										className="h-7 inline-flex items-center"
										onClick={() => setOpen(false)}
									>
										{item?.textContent}
									</a>
								</motion.li>
							);
						})}
					</ol>

					<button
						type="button"
						onClick={() => setOpen(!open)}
						style={{ height: 44 }}
						className="pl-2 pr-4 absolute inset-x-0 bottom-0 bg-inherit flex items-center justify-between gap-2"
					>
						<span className="flex grow min-w-0 items-center gap-1">
							<svg
								className="size-7 -rotate-90 shrink-0"
								viewBox="0 0 100 100"
							>
								<circle
									cx="50"
									cy="50"
									r="35"
									strokeWidth="15"
									fill="none"
									className="stroke-neutral-500"
								/>
								<motion.circle
									cx="50"
									cy="50"
									r="35"
									strokeWidth="15"
									strokeDashoffset="0"
									fill="none"
									pathLength="1"
									style={{ pathLength: scrollYProgress }}
									className="stroke-neutral-50"
									strokeLinecap="round"
								/>
							</svg>

							<span className="truncate">{currentTitle}</span>
						</span>

						<span>{percent}%</span>
					</button>
				</motion.div>
			</MotionConfig>
		</div>
	);
}

function Overlay(props: HTMLMotionProps<"div">) {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			exit={{
				opacity: 0,
			}}
			className="fixed inset-0 z-10 bg-background/50 backdrop-blur-sm"
			{...props}
		/>
	);
}
```

## Attribution

Source: Star UI · Original: https://starui.link/docs/components/scroll-island

Adapted from the original. Credit the original author when you ship this.
