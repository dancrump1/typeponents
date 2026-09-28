# Power Off Slide

Slide-to-power-off track with a draggable knob carrying a red power icon and a shimmering label.

**Interaction.** Drag the knob to the far right and the track is replaced by a shutting-down message before resetting itself; release short of the end and the knob snaps back. The label text shimmers in a continuous loop.

- Categories: Buttons
- Tags: drag, autoplay
- Import: `@/components/ui/power-off-slide`
- Inspiration: SmoothUI (adaptation) — https://www.smoothui.dev/doc/power-off-slide

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/power-off-slide.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `motion`

## Usage

```tsx
"use client";

import PowerOffSlide from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<PowerOffSlide />
		</div>
	);
}
```

## Source

### `components/ui/power-off-slide.tsx`

```tsx
"use client";

import { RefObject, useRef, useState } from "react";

import { Power } from "lucide-react";
import {
	motion,
	useAnimation,
	useAnimationFrame,
	useMotionValue,
	useTransform,
} from "motion/react";

// Credit:
// https://www.smoothui.dev/doc/power-off-slide

export default function PowerOffSlide() {
	const [isPoweringOff, setIsPoweringOff] = useState(false);
	const x = useMotionValue(0);
	const controls = useAnimation();
	const constraintsRef = useRef(null);
	const textRef: RefObject<HTMLDivElement | null> = useRef(null);

	const xInput = [0, 164];
	const opacityOutput = [0, 1];
	const opacity = useTransform(x, xInput, opacityOutput);

	useAnimationFrame((t) => {
		const duration = 2000;
		const progress = (t % duration) / duration;
		if (textRef.current) {
			textRef.current.style.setProperty("--x", `${(1 - progress) * 100}%`);
		}
	});

	const handleDragEnd = async () => {
		const dragDistance = x.get();
		if (dragDistance > 160) {
			await controls.start({ x: 168 });
			setIsPoweringOff(true);
			// Add a timeout to reset the component after 2 seconds
			setTimeout(() => {
				setIsPoweringOff(false);
				controls.start({ x: 0 });
				x.set(0);
			}, 2000);
		} else {
			controls.start({ x: 0 });
		}
	};

	return (
		<div className="flex h-auto items-center justify-center">
			<div className="w-56">
				{isPoweringOff ? (
					<div className="text-light-950 dark:text-dark-950 text-center">
						<p className="mb-2 text-xl font-light">Shutting down...</p>
					</div>
				) : (
					<div
						ref={constraintsRef}
						className="bg-light-400 dark:bg-dark-400 relative h-14 overflow-hidden rounded-full"
					>
						<div className="absolute inset-0 left-8 z-0 flex items-center justify-center overflow-hidden">
							<div className="text-md loading-shimmer text-light-950 relative w-full text-center font-normal select-none">
								Slide to power off
							</div>
						</div>
						<motion.div
							drag="x"
							dragConstraints={{ left: 0, right: 168 }}
							dragElastic={0}
							dragMomentum={false}
							onDragEnd={handleDragEnd}
							animate={controls}
							style={{ x }}
							className="bg-light-50 dark:bg-dark-50 absolute top-1 left-1 z-10 flex h-12 w-12 cursor-grab items-center justify-center rounded-full shadow-md active:cursor-grabbing"
						>
							<Power size={32} className="text-red-600" />
						</motion.div>
					</div>
				)}
			</div>
		</div>
	);
}
```

## Attribution

Source: SmoothUI · Original: https://www.smoothui.dev/doc/power-off-slide

Adapted from the original. Credit the original author when you ship this.
