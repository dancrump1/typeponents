# Aurora Background

Full-bleed backdrop of soft banded aurora light behind whatever you put in it.

**Interaction.** Runs on its own — the bands of colour drift slowly across the frame in an endless loop and do not react to the pointer.

- Categories: Backgrounds, Special Effects & FX
- Import: `@/components/ui/aurora-background`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/aurora-background.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `showRadialGradient` | `boolean` | `true` | — |

## Usage

```tsx
"use client";

import React from "react";

import { AuroraBackground } from "./component";
import { motion } from "motion/react";

export default function Usage() {
	return (
		<AuroraBackground>
			<motion.div
				initial={{ opacity: 0.0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: "easeInOut",
				}}
				className="relative flex flex-col gap-4 items-center justify-center px-4"
			>
				<div className="text-3xl md:text-7xl font-bold dark:text-secondary text-center">
					Background lights are cool you know.
				</div>
				<div className="font-extralight text-base md:text-4xl dark:text-secondary py-4">
					And this, is chemical burn.
				</div>
				<button className="bg-background dark:bg-background rounded-full w-fit text-secondary dark:text-secondary px-4 py-2">
					Debug now
				</button>
			</motion.div>
		</AuroraBackground>
	);
}
```

## Source

### `components/ui/aurora-background.tsx`

```tsx
"use client";

import React, { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
	children: ReactNode;
	showRadialGradient?: boolean;
}

export const AuroraBackground = ({
	className,
	children,
	showRadialGradient = true,
	...props
}: AuroraBackgroundProps) => {
	return (
		<div
			className={cn(
				"pointer-events-none relative flex flex-col  h-full items-center justify-center bg-background dark:bg-slate-950  text-slate-950 transition-bg",
				className
			)}
			{...props}
		>
			<div className="absolute inset-0 overflow-hidden">
				<div
					//   I'm sorry but this is what peak developer performance looks like // trigger warning
					className={cn(
						`
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            bg-size-[300%,200%]
            bg-position-[50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            dark:after:[background-image:var(--dark-gradient),var(--aurora)]
            after:bg-size-[200%,100%] 
            after:animate-aurora after:bg-fixed after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50`,
						showRadialGradient &&
							`mask-[radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
					)}
				></div>
			</div>
			{children}
		</div>
	);
};
```
