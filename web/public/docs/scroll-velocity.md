# Scroll Velocity

Marquee rows of repeating text or logos that slide sideways forever, with the page scroll acting as a throttle.

**Interaction.** Each row drifts at a steady pace on its own; scrolling the page pushes it faster, scrolling the other way flips its direction, and it eases back to the base drift once you stop.

- Categories: Scroll
- Tags: spring, scroll-driven, autoplay, responsive
- Import: `@/components/ui/scroll-velocity`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scroll-velocity.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
import {
	ScrollVelocityContainer,
	ScrollVelocityRow,
} from "./component";

const IMAGES_ROW_A = [
	"https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://plus.unsplash.com/premium_photo-1720139288219-e20aa9c8895b?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const IMAGES_ROW_B = [
	"https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://plus.unsplash.com/premium_photo-1720139288219-e20aa9c8895b?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function ScrollBasedVelocityImagesDemo() {
	return (
		<div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
			<ScrollVelocityContainer className="w-full">
				<ScrollVelocityRow baseVelocity={6} direction={1} className="py-4">
					{IMAGES_ROW_A.map((src, idx) => (
						<img
							key={idx}
							src={`${src}&ixlib=rb-4.0.3`}
							alt="Unsplash sample"
							width={240}
							height={160}
							loading="lazy"
							decoding="async"
							className="mx-4 inline-block h-40 w-60 rounded-lg object-cover shadow-xs"
						/>
					))}
				</ScrollVelocityRow>
				<ScrollVelocityRow baseVelocity={6} direction={-1} className="py-4">
					{IMAGES_ROW_B.map((src, idx) => (
						<img
							key={idx}
							src={`${src}&ixlib=rb-4.0.3`}
							alt="Unsplash sample"
							width={240}
							height={160}
							loading="lazy"
							decoding="async"
							className="mx-4 inline-block h-40 w-60 rounded-lg object-cover shadow-xs"
						/>
					))}
				</ScrollVelocityRow>
			</ScrollVelocityContainer>

			<div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background"></div>
			<div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background"></div>
		</div>
	);
}
```

## Source

### `components/ui/scroll-velocity.tsx`

```tsx
"use client";

import React, { useContext, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from "motion/react";
import type { MotionValue } from "motion/react";

interface ScrollVelocityRowProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	baseVelocity?: number;
	direction?: 1 | -1;
}

export const wrap = (min: number, max: number, v: number) => {
	const rangeSize = max - min;
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ScrollVelocityContext = React.createContext<MotionValue<number> | null>(
	null
);

export function ScrollVelocityContainer({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { scrollY } = useScroll();
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	});
	const velocityFactor = useTransform(smoothVelocity, (v) => {
		const sign = v < 0 ? -1 : 1;
		const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
		return sign * magnitude;
	});

	return (
		<ScrollVelocityContext.Provider value={velocityFactor}>
			<div className={cn("relative w-full", className)} {...props}>
				{children}
			</div>
		</ScrollVelocityContext.Provider>
	);
}

export function ScrollVelocityRow(props: ScrollVelocityRowProps) {
	const sharedVelocityFactor = useContext(ScrollVelocityContext);
	if (sharedVelocityFactor) {
		return (
			<ScrollVelocityRowImpl
				{...props}
				velocityFactor={sharedVelocityFactor}
			/>
		);
	}
	return <ScrollVelocityRowLocal {...props} />;
}

interface ScrollVelocityRowImplProps extends ScrollVelocityRowProps {
	velocityFactor: MotionValue<number>;
}

function ScrollVelocityRowImpl({
	children,
	baseVelocity = 5,
	direction = 1,
	className,
	velocityFactor,
	...props
}: ScrollVelocityRowImplProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const blockRef = useRef<HTMLDivElement>(null);
	const [numCopies, setNumCopies] = useState(1);

	const baseX = useMotionValue(0);
	const baseDirectionRef = useRef<number>(direction >= 0 ? 1 : -1);
	const currentDirectionRef = useRef<number>(direction >= 0 ? 1 : -1);
	const unitWidth = useMotionValue(0);

	const isInViewRef = useRef(true);
	const isPageVisibleRef = useRef(true);
	const prefersReducedMotionRef = useRef(false);

	useEffect(() => {
		const container = containerRef.current;
		const block = blockRef.current;
		if (!container || !block) return;

		const updateSizes = () => {
			const cw = container.offsetWidth || 0;
			const bw = block.scrollWidth || 0;
			unitWidth.set(bw);
			const nextCopies = bw > 0 ? Math.max(3, Math.ceil(cw / bw) + 2) : 1;
			setNumCopies((prev) => (prev === nextCopies ? prev : nextCopies));
		};

		updateSizes();

		const ro = new ResizeObserver(updateSizes);
		ro.observe(container);
		ro.observe(block);

		const io = new IntersectionObserver(([entry]) => {
			isInViewRef.current = entry.isIntersecting;
		});
		io.observe(container);

		const handleVisibility = () => {
			isPageVisibleRef.current = document.visibilityState === "visible";
		};
		document.addEventListener("visibilitychange", handleVisibility, {
			passive: true,
		});
		handleVisibility();

		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handlePRM = () => {
			prefersReducedMotionRef.current = mq.matches;
		};
		mq.addEventListener("change", handlePRM);
		handlePRM();

		return () => {
			ro.disconnect();
			io.disconnect();
			document.removeEventListener("visibilitychange", handleVisibility);
			mq.removeEventListener("change", handlePRM);
		};
	}, [children, unitWidth]);

	const x = useTransform([baseX, unitWidth], ([v, bw]) => {
		const width = Number(bw) || 1;
		const offset = Number(v) || 0;
		return `${-wrap(0, width, offset)}px`;
	});

	useAnimationFrame((_, delta) => {
		if (!isInViewRef.current || !isPageVisibleRef.current) return;
		const dt = delta / 1000;
		const vf = velocityFactor.get();
		const absVf = Math.min(5, Math.abs(vf));
		const speedMultiplier = prefersReducedMotionRef.current ? 1 : 1 + absVf;

		if (absVf > 0.1) {
			const scrollDirection = vf >= 0 ? 1 : -1;
			currentDirectionRef.current =
				baseDirectionRef.current * scrollDirection;
		}

		const bw = unitWidth.get() || 0;
		if (bw <= 0) return;
		const pixelsPerSecond = (bw * baseVelocity) / 100;
		const moveBy =
			currentDirectionRef.current * pixelsPerSecond * speedMultiplier * dt;
		baseX.set(baseX.get() + moveBy);
	});

	return (
		<div
			ref={containerRef}
			className={cn("w-full overflow-hidden whitespace-nowrap", className)}
			{...props}
		>
			<motion.div
				className="inline-flex items-center will-change-transform transform-gpu select-none"
				style={{ x }}
			>
				{Array.from({ length: numCopies }).map((_, i) => (
					<div
						key={i}
						ref={i === 0 ? blockRef : null}
						aria-hidden={i !== 0}
						className="inline-flex shrink-0 items-center"
					>
						{children}
					</div>
				))}
			</motion.div>
		</div>
	);
}

function ScrollVelocityRowLocal(props: ScrollVelocityRowProps) {
	const { scrollY } = useScroll();
	const localVelocity = useVelocity(scrollY);
	const localSmoothVelocity = useSpring(localVelocity, {
		damping: 50,
		stiffness: 400,
	});
	const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
		const sign = v < 0 ? -1 : 1;
		const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
		return sign * magnitude;
	});
	return (
		<ScrollVelocityRowImpl {...props} velocityFactor={localVelocityFactor} />
	);
}
```
