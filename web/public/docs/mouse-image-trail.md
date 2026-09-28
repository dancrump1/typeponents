# Mouse Image Trail

- Categories: Cursor & Pointer Effects
- Tags: spring, cursor-tracking
- Import: `@/components/ui/mouse-image-trail`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/mouse-image-trail.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `images` *(required)* | `string[]` | — | — |
| `renderImageBuffer` *(required)* | `number` | — | — |
| `rotationRange` *(required)* | `number` | — | — |

## Usage

```tsx
"use client";

import { MouseImageTrail } from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<MouseImageTrail />
		</div>
	);
}
```

## Source

### `components/ui/mouse-image-trail.tsx`

```tsx
import React, { MouseEventHandler, ReactNode, useRef } from "react";

import { useAnimate } from "motion/react";

// www.hover.dev/components/other#mouse-image-trail

export const MouseImageTrail = ({
	children,
	// List of image sources
	images,
	// Will render a new image every X pixels between mouse moves
	renderImageBuffer,
	// images will be rotated at a random number between zero and rotationRange,
	// alternating between a positive and negative rotation
	rotationRange,
}: {
	children: ReactNode;
	images: string[];
	renderImageBuffer: number;
	rotationRange: number;
}) => {
	const [scope, animate] = useAnimate();

	const lastRenderPosition = useRef({ x: 0, y: 0 });
	const imageRenderCount = useRef(0);

	const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
		const { clientX, clientY } = e;

		const distance = calculateDistance(
			clientX,
			clientY,
			lastRenderPosition.current.x,
			lastRenderPosition.current.y
		);

		if (distance >= renderImageBuffer) {
			lastRenderPosition.current.x = clientX;
			lastRenderPosition.current.y = clientY;

			renderNextImage();
		}
	};

	const calculateDistance = (
		x1: number,
		y1: number,
		x2: number,
		y2: number
	) => {
		const deltaX = x2 - x1;
		const deltaY = y2 - y1;

		// Using the Pythagorean theorem to calculate the distance
		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

		return distance;
	};

	const renderNextImage = () => {
		const imageIndex = imageRenderCount.current % images?.length;
		const selector = `[data-mouse-move-index="${imageIndex}"]`;

		const el = document.querySelector(selector) as HTMLElement;

		el.style.top = `${lastRenderPosition.current.y}px`;
		el.style.left = `${lastRenderPosition.current.x}px`;
		el.style.zIndex = imageRenderCount.current.toString();

		const rotation = Math.random() * rotationRange;

		animate(
			selector,
			{
				opacity: [0, 1],
				transform: [
					`translate(-50%, -25%) scale(0.5) ${
						imageIndex % 2
							? `rotate(${rotation}deg)`
							: `rotate(-${rotation}deg)`
					}`,
					`translate(-50%, -50%) scale(1) ${
						imageIndex % 2
							? `rotate(-${rotation}deg)`
							: `rotate(${rotation}deg)`
					}`,
				],
			},
			{ type: "spring", damping: 15, stiffness: 200 }
		);

		animate(
			selector,
			{
				opacity: [1, 0],
			},
			{ ease: "linear", duration: 0.5, delay: 5 }
		);

		imageRenderCount.current = imageRenderCount.current + 1;
	};

	return (
		<div
			ref={scope}
			className="relative overflow-hidden h-screen z-502"
			onMouseMove={handleMouseMove}
		>
			{children}

			{images?.map((img, index) => (
				<img
					className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-background object-cover opacity-0"
					src={img}
					alt={`Mouse move image ${index}`}
					key={index + "mouse-image-trail"}
					data-mouse-move-index={index}
				/>
			))}
		</div>
	);
};
```
