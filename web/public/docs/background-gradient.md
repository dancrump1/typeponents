# Background Gradient

Card wrapper ringed by a four-colour radial gradient with a blurred glow behind it.

**Interaction.** Runs on its own — the gradient slides back and forth around the edge of the card in a slow loop, and the outer glow brightens while the pointer is over it.

- Categories: Backgrounds
- Tags: hover
- Import: `@/components/ui/background-gradient`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/background-gradient.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |
| `containerClassName` | `string` | — | — |
| `animate` | `boolean` | `true` | — |

## Usage

```tsx
"use client";

import React from "react";

import { BackgroundGradient } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div>
				<BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-background dark:bg-background">
					<img
						src={`/itjustworks.jpg`}
						alt="jordans"
						height="400"
						width="400"
						className="object-contain"
					/>
					<p className="text-base sm:text-xl text-secondary mt-4 mb-2 dark:text-secondary">
						Air Jordan 4 Retro Reimagined
					</p>

					<p className="text-sm text-secondary dark:text-secondary">
						The Air Jordan 4 Retro Reimagined Bred will release on
						Saturday, February 17, 2024. Your best opportunity to get
						these right now is by entering raffles and waiting for the
						official releases.
					</p>
					<button className="rounded-full pl-4 pr-1 py-1 text-secondary flex items-center space-x-1 bg-background mt-4 text-xs font-bold dark:bg-background">
						<span>Buy now </span>
						<span className="bg-background rounded-full text-[0.6rem] px-2 py-0 text-secondary">
							$100
						</span>
					</button>
				</BackgroundGradient>
			</div>
		</div>
	);
}
```

## Source

### `components/ui/background-gradient.tsx`

```tsx
import React from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const BackgroundGradient = ({
	children,
	className,
	containerClassName,
	animate = true,
}: {
	children?: React.ReactNode;
	className?: string;
	containerClassName?: string;
	animate?: boolean;
}) => {
	const variants = {
		initial: {
			backgroundPosition: "0 50%",
		},
		animate: {
			backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
		},
	};
	return (
		<div
			className={cn("relative p-[4px] group max-w-sm", containerClassName)}
		>
			<motion.div
				variants={animate ? variants : undefined}
				initial={animate ? "initial" : undefined}
				animate={animate ? "animate" : undefined}
				transition={
					animate
						? {
								duration: 5,
								repeat: Infinity,
								repeatType: "reverse",
							}
						: undefined
				}
				style={{
					backgroundSize: animate ? "400% 400%" : undefined,
				}}
				className={cn(
					"absolute inset-0 rounded-3xl z-1 opacity-60 group-hover:opacity-100 blur-xl  transition duration-500",
					" bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
				)}
			/>
			<motion.div
				variants={animate ? variants : undefined}
				initial={animate ? "initial" : undefined}
				animate={animate ? "animate" : undefined}
				transition={
					animate
						? {
								duration: 5,
								repeat: Infinity,
								repeatType: "reverse",
							}
						: undefined
				}
				style={{
					backgroundSize: animate ? "400% 400%" : undefined,
				}}
				className={cn(
					"absolute inset-0 rounded-3xl z-1",
					"bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
				)}
			/>

			<div className={cn("relative z-10", className)}>{children}</div>
		</div>
	);
};
```
