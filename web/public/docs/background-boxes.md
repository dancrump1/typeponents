# Background Boxes

Backdrop grid of empty cells with faint plus marks at the intersections.

**Interaction.** Hovering a cell floods it with a random pastel colour instantly, and it clears again as the pointer moves on to the next one.

- Categories: Backgrounds
- Tags: hover
- Import: `@/components/ui/background-boxes`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/background-boxes.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |
| `rowCount` | `number` | `15` | — |
| `columnCount` | `number` | `5` | — |

## Usage

```tsx
"use client";

import React from "react";

import { Boxes } from "./component";
import { cn } from "@/lib/utils";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
				<div className="absolute inset-0 w-full h-full bg-slate-900 z-20 mask-[radial-gradient(transparent,white)] pointer-events-none" />

				<Boxes />
				<h1 className={cn("md:text-4xl text-xl text-secondary relative z-20")}>
					Tailwind is Awesome
				</h1>
				<p className="text-center mt-2 text-secondary relative z-20">
					Framer motion is the best animation library ngl
				</p>
			</div>
		</div>
	);
}
```

## Source

### `components/ui/background-boxes.tsx`

```tsx
"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const BoxesCore = ({
	className,
	rowCount = 15,
	columnCount = 5,
	...rest
}: {
	className?: string;
	rowCount?: number;
	columnCount?: number;
}) => {
	const rows = new Array(rowCount).fill(1);
	const cols = new Array(columnCount).fill(1);
	let colors = [
		"--sky-300",
		"--pink-300",
		"--green-300",
		"--yellow-300",
		"--red-300",
		"--purple-300",
		"--blue-300",
		"--indigo-300",
		"--violet-300",
	];
	const getRandomColor = () => {
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<div
			style={
				{
					// transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
				}
			}
			className={cn(
				"absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-10 ",
				className
			)}
			{...rest}
		>
			{rows.map((_, i) => (
				<motion.div
					key={`row` + i}
					// Add  'border-l  border-slate-700' to className for borders again
					className="w-16 h-8 relative"
				>
					{cols.map((_, j) => (
						<motion.div
							whileHover={{
								backgroundColor: `var(${getRandomColor()})`,
								transition: { duration: 0 },
							}}
							animate={{
								transition: { duration: 2 },
							}}
							key={`col` + j}
							// Add ' border-r border-t border-slate-700' to className for borders again
							className="w-16 h-8 relative"
						>
							{j % 2 === 0 && i % 2 === 0 ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 6v12m6-6H6"
									/>
								</svg>
							) : null}
						</motion.div>
					))}
				</motion.div>
			))}
		</div>
	);
};

export const Boxes = React.memo(BoxesCore);
```
