# Tracing Beam

- Categories: Special Effects & FX
- Tags: featured, spring, scroll-driven
- Import: `@/components/ui/tracing-beam`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/tracing-beam.json
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

import React from "react";

import { TracingBeam } from "./component";

export default function TracingBeamDemo() {
	return (
		<TracingBeam className="px-6">
			<div className="max-w-2xl mx-auto antialiased pt-4 relative">
				{dummyContent.map((item, index) => (
					<div key={`content-${index}`} className="mb-10">
						<h2 className="bg-background text-secondary rounded-full text-sm w-fit px-4 py-1 mb-4">
							{item.badge}
						</h2>

						<p className={"text-xl mb-4"}>{item.title}</p>

						<div className="text-sm  prose prose-sm dark:prose-invert">
							{item?.image && (
								<img
									src={item.image}
									alt="blog thumbnail"
									height="1000"
									width="1000"
									className="rounded-lg mb-10 object-cover"
								/>
							)}
							{item.description}
						</div>
					</div>
				))}
			</div>
		</TracingBeam>
	);
}

export const dummyContent = [
	{
		title: "Lorem Ipsum Dolor Sit Amet",
		description: (
			<>
				<p>
					Sit duis est minim proident non nisi velit non consectetur. Esse
					adipisicing laboris consectetur enim ipsum reprehenderit eu
					deserunt Lorem ut aliqua anim do. Duis cupidatat qui irure
					cupidatat incididunt incididunt enim magna id est qui sunt
					fugiat. Laboris do duis pariatur fugiat Lorem aute sit ullamco.
					Qui deserunt non reprehenderit dolore nisi velit exercitation
					Lorem qui do enim culpa. Aliqua eiusmod in occaecat reprehenderit
					laborum nostrud fugiat voluptate do Lorem culpa officia sint
					labore. Tempor consectetur excepteur ut fugiat veniam commodo et
					labore dolore commodo pariatur.
				</p>
				<p>
					Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
					veniam in commodo id reprehenderit adipisicing. Proident duis
					exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
				</p>
				<p>
					Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
					reprehenderit deserunt amet laborum consequat adipisicing officia
					qui irure id sint adipisicing. Adipisicing fugiat aliqua nulla
					nostrud. Amet culpa officia aliquip deserunt veniam deserunt
					officia adipisicing aliquip proident officia sunt.
				</p>
			</>
		),
		badge: "React",
		image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Lorem Ipsum Dolor Sit Amet",
		description: (
			<>
				<p>
					Ex irure dolore veniam ex velit non aute nisi labore ipsum
					occaecat deserunt cupidatat aute. Enim cillum dolor et nulla sunt
					exercitation non voluptate qui aliquip esse tempor. Ullamco ut
					sunt consectetur sint qui qui do do qui do. Labore laborum culpa
					magna reprehenderit ea velit id esse adipisicing deserunt amet
					dolore. Ipsum occaecat veniam commodo proident aliqua id ad
					deserunt dolor aliquip duis veniam sunt.
				</p>
				<p>
					In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
					veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
					reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
					cillum ut mollit.
				</p>
			</>
		),
		badge: "Changelog",
		image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Lorem Ipsum Dolor Sit Amet",
		description: (
			<>
				<p>
					Ex irure dolore veniam ex velit non aute nisi labore ipsum
					occaecat deserunt cupidatat aute. Enim cillum dolor et nulla sunt
					exercitation non voluptate qui aliquip esse tempor. Ullamco ut
					sunt consectetur sint qui qui do do qui do. Labore laborum culpa
					magna reprehenderit ea velit id esse adipisicing deserunt amet
					dolore. Ipsum occaecat veniam commodo proident aliqua id ad
					deserunt dolor aliquip duis veniam sunt.
				</p>
			</>
		),
		badge: "Launch Week",
		image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];
```

## Source

### `components/ui/tracing-beam.tsx`

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export const TracingBeam = ({
	children,
	className,
	containerRef,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [componentContainerRef, setComponentContainerRef] = useState(null);
	useEffect(() => {
		setComponentContainerRef(containerRef);
	}, [containerRef]);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
		// container: componentContainerRef || null,
	});

	const contentRef = useRef<HTMLDivElement>(null);
	const [svgHeight, setSvgHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setSvgHeight(contentRef.current.offsetHeight);
		}
	}, []);

	const y1 = useSpring(
		useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
		{
			stiffness: 500,
			damping: 90,
		}
	);
	const y2 = useSpring(
		useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
		{
			stiffness: 500,
			damping: 90,
		}
	);

	if (!!componentContainerRef && componentContainerRef?.current === undefined)
		return null;

	return (
		<motion.div
			ref={ref}
			className={cn(
				"relative w-full max-w-4xl mx-auto h-full px-6",
				className
			)}
		>
			<div className="absolute -left-4 md:-left-20 top-3 pt-24">
				<motion.div
					transition={{
						duration: 0.2,
						delay: 0.5,
					}}
					animate={{
						boxShadow:
							scrollYProgress.get() > 0
								? "none"
								: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
					}}
					className="ml-[27px] h-4 w-4 rounded-full border border-netural-200 shadow-xs flex items-center justify-center"
				>
					<motion.div
						transition={{
							duration: 0.2,
							delay: 0.5,
						}}
						animate={{
							backgroundColor: "white",
							borderColor: "white",
						}}
						className="h-2 w-2  rounded-full border border-neutral-300 bg-background"
					/>
				</motion.div>
				<svg
					viewBox={`0 0 20 ${svgHeight}`}
					width="20"
					height={svgHeight} // Set the SVG height
					className=" ml-4 block"
					aria-hidden="true"
				>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${
							svgHeight * 0.8
						} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="hsl(358 70% 42%)"
						strokeOpacity="0.16"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${
							svgHeight * 0.8
						} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="url(#gradient)"
						strokeWidth="1.25"
						className="motion-reduce:hidden"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<defs>
						<motion.linearGradient
							id="gradient"
							gradientUnits="userSpaceOnUse"
							x1="0"
							x2="0"
							y1={y1} // set y1 for gradient
							y2={y2} // set y2 for gradient
						>
							<stop stopColor="hsl(358 70% 42%)" stopOpacity="0"></stop>
							<stop stopColor="hsl(358 70% 42%)"></stop>
							<stop offset="0.325" stopColor="hsl(358 70% 42%)"></stop>
							<stop
								offset="1"
								stopColor="hsl(345 6% 13%)"
								stopOpacity="0"
							></stop>
						</motion.linearGradient>
					</defs>
				</svg>
			</div>
			<div className="" ref={contentRef}>
				{children}
			</div>
		</motion.div>
	);
};
```
