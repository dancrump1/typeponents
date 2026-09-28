# Progressive Blur

Layered blur overlay that ramps from clear to fully blurred across one chosen edge of whatever sits behind it.

**Interaction.** Static on its own, holding a soft blur over an image edge so caption text stays readable; in the demo the second image fades its blur and caption in on hover and back out when the pointer leaves.

- Categories: Backgrounds
- Import: `@/components/ui/progressive-blur`
- Inspiration: Motion Primitives (adaptation) — https://motion-primitives.com/docs/progressive-blur

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/progressive-blur.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `"top" | "right" | "bottom" | "left"` | `"bottom"` | — |
| `blurLayers` | `number` | `8` | — |
| `className` | `string` | — | — |
| `blurIntensity` | `number` | `0.25` | — |

## Usage

```tsx
import { useState } from "react";

import Image from "next/image";

import { ProgressiveBlur } from "./component";
import { motion } from "motion/react";

export default function ProgressiveBlurUsage() {
	const [isHover, setIsHover] = useState(false);

	return (
		<section className="flex">
			<div className="relative my-4 aspect-square w-[300px] overflow-hidden rounded-[4px]">
				<Image
					src="/itjustworks.jpg"
					width={100}
					height={100}
					alt="Benjamin Spiers - Moonlight 2023"
					className="absolute inset-0"
				/>
				<ProgressiveBlur
					className="pointer-events-none absolute bottom-0 left-0 h-[50%] w-full"
					blurIntensity={6}
				/>
				<div className="absolute bottom-0 left-0">
					<div className="flex flex-col items-start gap-0 px-5 py-4">
						<p className="text-base font-medium text-secondary">
							Benjamin Spiers
						</p>
						<span className="mb-2 text-base text-secondary">
							Moonlight 2023
						</span>
						<p className="text-base text-secondary">
							Oil on linen. 40cm by 30cm
						</p>
					</div>
				</div>
			</div>
			<div
				className="relative my-4 aspect-square h-[300px] overflow-hidden rounded-[4px]"
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<Image
					src="/itjustworks.jpg"
					width={100}
					height={100}
					alt="John Martin - Pandemonium"
					className="absolute inset-0"
				/>
				<ProgressiveBlur
					className="pointer-events-none absolute bottom-0 left-0 h-[75%] w-full"
					blurIntensity={0.5}
					animate={isHover ? "visible" : "hidden"}
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1 },
					}}
					transition={{ duration: 0.2, ease: "easeOut" }}
				/>
				<motion.div
					className="absolute bottom-0 left-0"
					animate={isHover ? "visible" : "hidden"}
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1 },
					}}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					<div className="flex flex-col items-start gap-0 px-5 py-4">
						<p className="text-base font-medium text-secondary">
							John Martin
						</p>
						<span className="text-base text-secondary">Pandemonium</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
```

## Source

### `components/ui/progressive-blur.tsx`

```tsx
"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";

// Credit:
// https://motion-primitives.com/docs/progressive-blur

export const GRADIENT_ANGLES = {
	top: 0,
	right: 90,
	bottom: 180,
	left: 270,
};

export type ProgressiveBlurProps = {
	direction?: keyof typeof GRADIENT_ANGLES;
	blurLayers?: number;
	className?: string;
	blurIntensity?: number;
} & HTMLMotionProps<"div">;

export function ProgressiveBlur({
	direction = "bottom",
	blurLayers = 8,
	className,
	blurIntensity = 0.25,
	...props
}: ProgressiveBlurProps) {
	const layers = Math.max(blurLayers, 2);
	const segmentSize = 1 / (blurLayers + 1);

	return (
		<div className={cn("relative", className)}>
			{Array.from({ length: layers }).map((_, index) => {
				const angle = GRADIENT_ANGLES[direction];
				const gradientStops = [
					index * segmentSize,
					(index + 1) * segmentSize,
					(index + 2) * segmentSize,
					(index + 3) * segmentSize,
				].map(
					(pos, posIndex) =>
						`rgba(255, 255, 255, ${
							posIndex === 1 || posIndex === 2 ? 1 : 0
						}) ${pos * 100}%`
				);

				const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(
					", "
				)})`;

				return (
					<motion.div
						key={index + "progressive-blur"}
						className="pointer-events-none absolute inset-0 rounded-[inherit]"
						style={{
							maskImage: gradient,
							WebkitMaskImage: gradient,
							backdropFilter: `blur(${index * blurIntensity}px)`,
						}}
						{...props}
					/>
				);
			})}
		</div>
	);
}
```

## Attribution

Source: Motion Primitives · Original: https://motion-primitives.com/docs/progressive-blur

Adapted from the original. Credit the original author when you ship this.
