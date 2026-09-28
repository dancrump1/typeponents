# Meteors

- Categories: Backgrounds
- Import: `@/components/ui/meteors`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/meteors

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/meteors.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `number` | `number` | — | — |
| `className` | `string` | — | — |

## Usage

```tsx
import React from "react";

import { Meteors } from "./component";

export default function MeteorsDemo() {
	return (
		<div className="">
			<div className="relative w-full max-w-xl">
				<div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-linear-to-r from-blue-500 to-teal-500 blur-3xl" />
				<div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-background px-4 py-8 shadow-xl">
					<div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-2 w-2 text-secondary"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
							/>
						</svg>
					</div>

					<h1 className="relative z-50 mb-4 text-xl font-bold text-secondary">
						Meteors because they&apos;re cool
					</h1>

					<p className="relative z-50 mb-4 text-base font-normal text-slate-500">
						I don&apos;t know what to write so I&apos;ll just paste
						something cool here. One more sentence because lorem ipsum is
						just unacceptable. Won&apos;t ChatGPT the shit out of this.
					</p>

					<button className="rounded-lg border border-gray-500 px-4 py-1 text-secondary">
						Explore
					</button>

					{/* Meaty part - Meteor effect */}
					<Meteors number={20} />
				</div>
			</div>
		</div>
	);
}
```

## Source

### `components/ui/meteors.tsx`

```tsx
import React from "react";

import { cn } from "@/lib/utils";

// https://ui.aceternity.com/components/meteors

export const Meteors = ({
	number,
	className,
}: {
	number?: number;
	className?: string;
}) => {
	const meteors = new Array(number || 20).fill(true);
	return (
		<>
			{meteors.map((el, idx) => (
				<span
					key={"meteor" + idx}
					className={cn(
						"animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-215",
						"before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-px before:bg-linear-to-r before:from-[#64748b] before:to-transparent",
						className
					)}
					style={{
						top: 0,
						left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
						animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
						animationDuration:
							Math.floor(Math.random() * (10 - 2) + 2) + "s",
					}}
				></span>
			))}
		</>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/meteors

Adapted from the original. Credit the original author when you ship this.
