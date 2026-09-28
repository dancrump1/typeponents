# Pin

- Categories: Special Effects & FX
- Tags: hover
- Import: `@/components/ui/pin`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/3d-pin

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/pin.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | — |
| `href` | `string` | — | — |
| `className` | `string` | — | — |
| `containerClassName` | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { PinContainer } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="h-160 w-full flex items-center justify-center ">
				<PinContainer
					title="/ui.aceternity.com"
					href="https://twitter.com/mannupaaji"
				>
					<div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-80 ">
						<h3 className="max-w-xs pb-2! m-0! font-bold  text-base text-slate-100">
							Aceternity UI
						</h3>
						<div className="text-base m-0! p-0! font-normal">
							<span className="text-slate-500 ">
								Customizable Tailwind CSS and Framer Motion Components.
							</span>
						</div>
						<div className="flex flex-1 w-full rounded-lg mt-4 bg-linear-to-br from-violet-500 via-purple-500 to-blue-500" />
					</div>
				</PinContainer>
			</div>
		</div>
	);
}
```

## Source

### `components/ui/pin.tsx`

```tsx
"use client";

import React, { useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// https://ui.aceternity.com/components/3d-pin

export const PinContainer = ({
	children,
	title,
	href,
	className,
	containerClassName,
}: {
	children: React.ReactNode;
	title?: string;
	href?: string;
	className?: string;
	containerClassName?: string;
}) => {
	const [transform, setTransform] = useState(
		"translate(-50%,-50%) rotateX(0deg)"
	);

	const onMouseEnter = () => {
		setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
	};
	const onMouseLeave = () => {
		setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
	};

	return (
		<div
			className={cn(
				"relative group/pin z-40  cursor-pointer text-foreground",
				containerClassName
			)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div
				style={{
					perspective: "1000px",
					transform: "rotateX(70deg) translateZ(0deg)",
				}}
				className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
			>
				<div
					style={{
						transform: transform,
					}}
					className="absolute left-1/2 p-4 top-1/2  flex justify-start items-start  rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-background border border-white/10 group-hover/pin:border-white/20 transition duration-700 overflow-hidden"
				>
					<div className={cn(" relative z-40 ", className)}>
						{children}
					</div>
				</div>
			</div>
			<PinPerspective title={title} href={href} />
		</div>
	);
};

export const PinPerspective = ({
	title,
	href,
}: {
	title?: string;
	href: string;
}) => {
	return (
		<motion.div className="w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-60 transition duration-500">
			<div className=" w-full h-full -mt-7 flex-none  inset-0">
				<div className="absolute top-0 inset-x-0  flex justify-center">
					<Link
						href={href || ""}
						target={"_blank"}
						className="relative flex space-x-2 items-center z-10 rounded-full bg-background py-0.5 px-4 ring-1 ring-white/10 "
					>
						<span className="relative z-20 text-foreground text-xs font-bold inline-block py-0.5">
							{title}
						</span>

						<span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
					</Link>
				</div>

				<div
					style={{
						perspective: "1000px",
						transform: "rotateX(70deg) translateZ(0)",
					}}
					className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
				>
					<>
						<motion.div
							initial={{
								opacity: 0,
								scale: 0,
								x: "-50%",
								y: "-50%",
							}}
							animate={{
								opacity: [0, 1, 0.5, 0],
								scale: 1,

								z: 0,
							}}
							transition={{
								duration: 6,
								repeat: Infinity,
								delay: 0,
							}}
							className="absolute left-1/2 top-1/2  h-45 w-45 rounded-[50%] bg-sky-500/8 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
						></motion.div>
						<motion.div
							initial={{
								opacity: 0,
								scale: 0,
								x: "-50%",
								y: "-50%",
							}}
							animate={{
								opacity: [0, 1, 0.5, 0],
								scale: 1,

								z: 0,
							}}
							transition={{
								duration: 6,
								repeat: Infinity,
								delay: 2,
							}}
							className="absolute left-1/2 top-1/2  h-45 w-45 rounded-[50%] bg-sky-500/8 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
						></motion.div>
						<motion.div
							initial={{
								opacity: 0,
								scale: 0,
								x: "-50%",
								y: "-50%",
							}}
							animate={{
								opacity: [0, 1, 0.5, 0],
								scale: 1,

								z: 0,
							}}
							transition={{
								duration: 6,
								repeat: Infinity,
								delay: 4,
							}}
							className="absolute left-1/2 top-1/2  h-45 w-45 rounded-[50%] bg-sky-500/8 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
						></motion.div>
					</>
				</div>

				<>
					<motion.div className="absolute right-1/2 bottom-1/2 bg-linear-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
					<motion.div className="absolute right-1/2 bottom-1/2 bg-linear-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40  " />
					<motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
					<motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40 " />
				</>
			</div>
		</motion.div>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/3d-pin

Adapted from the original. Credit the original author when you ship this.
